import express from "express";
import songController from "./song.controller";
const SongRouter = express.Router();

SongRouter.route("/").get(songController.getAll).post(songController.create);
SongRouter.route("/:songId")
  .get(songController.getOne)
  .delete(songController.deleteOne);

export default SongRouter;
