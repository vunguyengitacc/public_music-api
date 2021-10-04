import Result from "../../helpers/result.helper";
import Album from "../Album/album.model";
import Category from "../Category/category.model";
import Singer from "../Singer/singer.model";
import Song from "./song.model";

const getAll = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .populate("singer")
      .populate("category")
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
      .populate("category")
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

const deleteOne = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Song.findByIdAndDelete(songId, { passRawResult: true });
    console.log(song);
    await Singer.findOneAndUpdate(
      { _id: song.singerId },
      { $pull: { songId: song._id } }
    );
    await Category.findOneAndUpdate(
      { _id: song.categoryId },
      { $pull: { songId: song._id } }
    );
    await Album.findOneAndUpdate(
      { songId: song._id },
      { $pull: { songId: song._id } }
    );
    await Album.findOneAndUpdate(
      { mainSongId: song._id },
      { mainSongId: null }
    );
    return Result.success(res, { song });
  } catch (err) {
    next(err);
  }
};

const songController = {
  getAll,
  getOne,
  create,
  deleteOne,
};

export default songController;
