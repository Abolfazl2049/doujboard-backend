import {checkSchema} from "express-validator";
const reactionSchema = checkSchema({
  douj: {
    in: "body",
    isNumeric: true
  },
  type: {
    in: "body",
    isString: true,
    isIn: {
      options: [["like", "dislike"]]
    }
  }
});

export {reactionSchema};
