import Result from "../../helpers/result.helper";
import Song from "./song.model";

const getAll = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .populate("singer")
      .populate("categories")
      .lean();
    return Result(res, { songs });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const songId = req.params;
    const song = await Song.findById(songId)
      .populate("singer")
      .populate("categories")
      .lean();
    return Result(res, { song });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const newSong = await Song.create(data);
    return Result(res, { newSong });
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
