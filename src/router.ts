import express from "express";
import authRouter from "./services/auth/router.js";
import doujRouter from "./services/douj/router.js";
import userRouter from "./services/user/router.js";
import reactionRouter from "./services/reaction/router.js";
const appRouter = express.Router();
appRouter.get("/", (req, res) => {
  res.status(200).send(`<pre> Doujboard API Server.

     <a href='/admin'>admin panel </a> 
     
     <a href='/docs'>docs </a></pre>`);
});
appRouter.use("/auth", authRouter);
appRouter.use("/douj", doujRouter);
appRouter.use("/user", userRouter);
appRouter.use("/reaction", reactionRouter);
export {appRouter};
