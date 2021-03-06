import Result from "../../helpers/result.helper";
import Singer from "./singer.model";

const getAll = async (req, res, next) => {
  try {
    const singers = await Singer.find().populate("songs").lean();
    return Result.success(res, { singers });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { singerId } = req.params;
    const singer = await Singer.findById(singerId).populate("songs").lean();
    return Result.success(res, { singer });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const newSinger = await Singer.create(data);
    return Result.success(res, { newSinger });
  } catch (err) {
    next(err);
  }
};

const singerController = {
  getAll,
  getOne,
  create,
};

export default singerController;
