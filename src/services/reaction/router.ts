import {Router} from "express";
import {reactionSchema} from "./schema.js";
import {createReaction, getReactionsByDouj} from "./service.js";

const reactionRouter = Router();

reactionRouter.get("/:douj/reactions", getReactionsByDouj);
reactionRouter.post("/:douj/reactions", reactionSchema, createReaction);

export default reactionRouter;
