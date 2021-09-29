import express from "express";
import categoryController from "./category.controller";

const CategoryRouter = express.Router();

CategoryRouter.route("/")
  .get(categoryController.getAll)
  .post(categoryController.create);
CategoryRouter.route("/:categoryId").get(categoryController.getOne);

export default CategoryRouter;
