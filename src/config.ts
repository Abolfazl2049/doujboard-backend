import "dotenv/config.js";
export const appConfig = {
  PORT: process.env.PORT || 3000,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://172.24.18.236:399",
  publicRoutes: ["/api/v1/auth/signin", "/api/v1/"]
};
