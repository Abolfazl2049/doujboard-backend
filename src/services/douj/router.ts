import {Router} from "express";
import {newCategorySchema, newDoujSchema, publicDoujGetListSchema} from "./schema.js";
import DoujService from "./app.js";

const doujRouter = Router();
import os from "os";
import formData from "express-form-data";
doujRouter.get("/", DoujService.getList);
doujRouter.post(
  "/",
  formData.parse({
    uploadDir: os.tmpdir()
  }),
  formData.format(),
  formData.stream(),
  formData.union(),
  newDoujSchema,
  DoujService.newDouj
);
doujRouter.get("/category", DoujService.getCategoryList);
doujRouter.post("/category", newCategorySchema, DoujService.newCategory);
doujRouter.get("/public", publicDoujGetListSchema, DoujService.getPublicDoujs);
export default doujRouter;
