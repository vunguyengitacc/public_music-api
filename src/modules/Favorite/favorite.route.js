import express from "express";
import favoriteController from "./favorite.controller";
const FavoriteRouter = express.Router();

FavoriteRouter.route("/me").get(favoriteController.getMyFavorite);

export default FavoriteRouter;
