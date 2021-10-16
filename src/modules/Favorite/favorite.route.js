import express from "express";
import favoriteController from "./favorite.controller";
const FavoriteRouter = express.Router();

FavoriteRouter.route("/me").get(favoriteController.getMyFavorite);
FavoriteRouter.route("/me/:songId")
  .get(favoriteController.checkIfExist)
  .post(favoriteController.addSong)
  .delete(favoriteController.removeSong);

export default FavoriteRouter;
