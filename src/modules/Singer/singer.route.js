import express from "express";
import singerController from "./singer.controller";

const SingerRouter = express.Router();

SingerRouter.route("/")
  .get(singerController.getAll)
  .post(singerController.create);
SingerRouter.route("/:singerId").get(singerController.getOne);

export default SingerRouter;
