import "dotenv/config.js";
export const appConfig = {
  PORT: process.env.PORT || 3000,
  publicRoutes: ["/auth/login", "/auth/signup", "/"]
};
