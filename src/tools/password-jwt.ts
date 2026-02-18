import {Strategy as JwtStrategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";
import fs from "fs";
import path from "path";
import userDb from "#src/services/user/db.js";
import {PassportStatic} from "passport";

const PUB_KEY = fs.readFileSync(path.resolve("pub_key.pem"), "utf8");

const cookieExtractor = (req: any) => {
  if (!req || !req.cookies) return null;
  return req.cookies["auth_token"];
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"]
};

let configJwtPassport = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options as any, function (payload: any, done: Function) {
      userDb.User.findOne({where: {id: payload.sub}, attributes: ["username", "id", "createdAt"]})
        .then(user => {
          if (user) return done(null, user);
          else return done(null, false);
        })
        .catch(err => {
          done(err, false);
        });
    })
  );
};
export default configJwtPassport;
