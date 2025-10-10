import {checkSchema, Schema} from "express-validator";

const paginationSchemaRaw: Schema = {
  page: {
    in: "query",
    isNumeric: true,
    optional: {options: {nullable: true}}
  },
  pageSize: {
    in: "query",
    isNumeric: true,
    optional: {options: {nullable: true}}
  }
};
const paginationSchema = checkSchema(paginationSchemaRaw);

export {paginationSchema , paginationSchemaRaw};
