import "dotenv/config";
import express from "express";
import passport from "passport";
import sequelize from "./tools/sequelize.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middlewares/error-handler.js";
import {appRouter} from "./router.js";
import swaggerUi from "swagger-ui-express";
import {admin, adminRouter} from "./tools/adminjs.js";
import {applyLimiter} from "./tools/rate-limit.js";
import {appConfig} from "./config.js";
import configJwtPassport from "./tools/password-jwt.js";
import routeProtector from "./middlewares/route-protector.js";
import {requestLogger} from "./middlewares/logger.js";
const app = express();
const swaggerJsonFilePath = await import("../swagger_output.json", {
  with: {type: "json"}
});

// adminsjs setup
app.use(admin.options.rootPath, adminRouter);

//  app basic settings
app.use(applyLimiter());
app.use(
  cors({
    origin: appConfig.CLIENT_ORIGIN,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// static files
app.use(express.static("public"));

// passport js config
configJwtPassport(passport);
app.use(passport.initialize());

//swagger route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFilePath));

// custom middlewares
app.use(routeProtector);
app.use(requestLogger);

// app router
app.use("/api/v1", appRouter);

// error handler
app.use(errorHandler);

// app listen
app.listen(appConfig.PORT, () => {
  sequelize
    .sync({force: false})
    .then(() => {
      console.log(`http://localhost:${appConfig.PORT}`);
    })
    .catch(err => {
      console.log("err", err);
    });
});
