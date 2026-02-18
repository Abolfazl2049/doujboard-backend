import {appConfig} from "#src/config.js";
import {NextFunction, Request, Response} from "express";
import passport from "passport";

const routeProtector = (req: Request, res: Response, next: NextFunction) => {
  console.log("include:", appConfig.publicRoutes.includes(req.path), "path:", req.path);
  if (!appConfig.publicRoutes.includes(req.path)) passport.authenticate("jwt", {session: false})(req, res, next);
  else next();
};
export default routeProtector;
