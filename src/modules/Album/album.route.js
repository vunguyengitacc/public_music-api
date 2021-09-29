import express from "express";
import albumController from "./album.controller";

const AlbumRouter = express.Router();

AlbumRouter.route("/").get(albumController.getAll).post(albumController.create);
AlbumRouter.route("/:albumId")
  .get(albumController.getOne)
  .put(albumController.update);

export default AlbumRouter;
