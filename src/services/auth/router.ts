import express from "express";
import authService from "./app.js";
import {LoginRegisterSchema} from "./schema.js";
const router = express.Router();

// Authenticate (creates the user when it doesn't exist)
router.post("/signin", LoginRegisterSchema, authService.signin);

export default router;
