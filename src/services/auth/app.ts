import {NextFunction, Request, Response} from "express";
import {genPassword, issueJWT, validPassword} from "./lib.js";
import authDb from "../user/db.js";
import {sendRes} from "#src/utils/api-response.js";
import {validateReqSchema} from "#src/utils/validation.js";
import DoujDb from "../douj/db.js";

const parseExpiresToMs = (expires?: string) => {
  if (!expires) return undefined;
  const n = parseInt(expires as string, 10);
  if (expires.endsWith("d")) return n * 24 * 60 * 60 * 1000;
  if (expires.endsWith("h")) return n * 60 * 60 * 1000;
  if (expires.endsWith("m")) return n * 60 * 1000;
  return undefined;
};

// signup merged into `login()` — single endpoint will create user when not found

let signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateReqSchema(req);

    // try to find existing user (don't use getUser — it throws on not-found)
    let user = await authDb.User.findOne({where: {username: req.body.username}});

    // if user doesn't exist, create it (signup-on-login)
    if (!user) {
      const saltHash = genPassword(req.body.password);
      user = await authDb.User.create({
        username: req.body.username,
        hash: saltHash.hash,
        salt: saltHash.salt
      });
      try {
        await DoujDb.Category.create({user: user.id, name: "Default"});
      } catch (e) {
        console.error("Error creating default category:", e);
      }

      const tokenObject = issueJWT(user);
      const rawToken = tokenObject.token.replace(/^Bearer\s+/, "");

      res.cookie("auth_token", rawToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: parseExpiresToMs(tokenObject.expires)
      });

      return res.status(200).json({token: tokenObject.token, expiresIn: tokenObject.expires});
    }

    // existing user — validate password
    const isValid = validPassword(req.body.password, user.hash, user.salt);
    if (!isValid) throw {status: 401, message: "wrong password or username"};

    const tokenObject = issueJWT(user);
    const rawToken = tokenObject.token.replace(/^Bearer\s+/, "");

    res.cookie("auth_token", rawToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: parseExpiresToMs(tokenObject.expires)
    });

    return res.status(200).json({token: tokenObject.token, expiresIn: tokenObject.expires});
  } catch (err) {
    next(err);
  }
};

export default {
  signin
};
