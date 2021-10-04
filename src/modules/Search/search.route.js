import express from "express";
import searchController from "./search.controller";

const SearchRouter = express.Router();

SearchRouter.route("/").get(searchController.searchFullText);

export default SearchRouter;
