import {NextFunction, Request, Response} from "express";
import {genPassword, issueJWT, validPassword} from "./lib.js";
import authDb from "../user/db.js";
import {sendRes} from "#src/utils/api-response.js";
import {validateReqSchema} from "#src/utils/validation.js";

let signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateReqSchema(req);

    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    let user = await authDb.User.create({
      username: req.body.username,
      hash: hash,
      salt: salt
    });
    const token = issueJWT(user);

    sendRes(req, res, {
      user,
      token
    });
  } catch (err) {
    next(err);
  }
};

let login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateReqSchema(req);
    let user = await authDb.getUser(req.body.username);
    const isValid = validPassword(req.body.password, user.hash, user.salt);

    if (isValid) {
      const tokenObject = issueJWT(user);
      res.status(200).json({token: tokenObject.token, expiresIn: tokenObject.expires});
    } else
      throw {
        status: 401,
        message: "wrong password or username"
      };
  } catch (err) {
    next(err);
  }
};

export default {
  signup,
  login
};
