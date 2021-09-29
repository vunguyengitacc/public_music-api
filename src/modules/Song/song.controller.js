import Result from "../../helpers/result.helper";
import Category from "../Category/category.model";
import Singer from "../Singer/singer.model";
import Song from "./song.model";

const getAll = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .populate("singer")
      .populate("categories")
      .lean();
    return Result.success(res, { songs });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId)
      .populate("singer")
      .populate("categories")
      .lean();
    return Result.success(res, { song });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const newSong = await Song.create(data);
    await Singer.findOneAndUpdate(
      { _id: data.singerId },
      { $push: { songId: newSong._id } }
    );
    await Category.findOneAndUpdate(
      { _id: data.categoryId },
      { $push: { songId: newSong._id } }
    );
    return Result.success(res, { newSong });
  } catch (err) {
    next(err);
  }
};

const songController = {
  getAll,
  getOne,
  create,
};

export default songController;
