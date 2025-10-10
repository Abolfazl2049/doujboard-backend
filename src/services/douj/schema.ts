import {checkSchema} from "express-validator";
import {paginationSchemaRaw} from "../public/schema.js";
const newDoujSchema = checkSchema({
  title: {
    in: "body",
    isString: true
  },
  hidden: {
    in: "body",
    optional: true,
    isBoolean: true,
    default: false
  },
  category: {
    in: "body",
    isNumeric: true
  },
  link: {
    in: "body",
    isString: true
  },
  tags: {
    in: "body",
    optional: true,
    isString: true
  },
  visibility: {
    in: "body",
    optional: true,
    isString: true,
    isIn: {
      options: [["private", "public"]],
      errorMessage: "Visibility must be either 'private' or 'public'"
    }
  }
});

const newCategorySchema = checkSchema({
  name: {
    isString: true,
    in: "body"
  }
});
const publicDoujGetListSchema = checkSchema({
  ...paginationSchemaRaw,
  category: {
    in: "query",
    isString: true,
    optional: {options: {nullable: true}}
  },
  search: {
    in: "query",
    isString: true,
    optional: {options: {nullable: true}}
  },
  tags: {
    in: "query",
    isString: true,
    optional: {options: {nullable: true}}
  }
});
export {newCategorySchema, newDoujSchema, publicDoujGetListSchema};
