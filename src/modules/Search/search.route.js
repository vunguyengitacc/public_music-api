import express from "express";
import { validateQuery } from "../../middlewares/validate.middleware";
import searchController from "./search.controller";
import { searchFullTextSchema } from "./search.validate";

const SearchRouter = express.Router();

SearchRouter.route("/").get(
  validateQuery(searchFullTextSchema),
  searchController.searchFullText
);

export default SearchRouter;
