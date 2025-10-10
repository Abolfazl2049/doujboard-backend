import {NextFunction, Request, Response} from "express";
import {Reaction} from "./db.js";
import {validateReqSchema} from "#src/utils/validation.js";

async function createReaction(req: Request, res: Response, next: NextFunction) {
  try {
    validateReqSchema(req);
    const {type} = req.body;
    const douj = req.params.douj;
    const existingReaction = await Reaction.findOne({where: {user: req.user?.id, douj: douj}});
    if (existingReaction && existingReaction.type === type) {
      await Reaction.destroy({where: {id: existingReaction.id}});
      res.status(200).end();
    } else if (existingReaction) {
      await Reaction.update({type: type}, {where: {id: existingReaction.id}});
      res.status(200).end();
    } else {
      await Reaction.create({user: req.user?.id, douj, type: type});
      res.status(201).end();
    }
  } catch (err) {
    next(err);
  }
}
async function getReactionsByDouj(req: Request, res: Response, next: NextFunction) {
  try {
    const douj = req.params.douj;
    const reactions = await Reaction.findAll({where: {douj: douj}});
    res.status(200).json(reactions);
  } catch (err) {
    next(err);
  }
}
export {createReaction, getReactionsByDouj};
