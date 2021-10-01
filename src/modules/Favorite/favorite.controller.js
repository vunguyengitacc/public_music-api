import Result from "../../helpers/result.helper";
import Song from "../Song/song.model";
import Favorite from "./favorite.model";

const getMyFavorite = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let favorite = await Favorite.find({ userId })
      .populate("user")
      .populate("songs")
      .lean();
    if (favorite.length == 0) favorite = await Favorite.create({ userId });
    return Result.success(res, { favorite });
  } catch (err) {
    next(err);
  }
};

const addSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const userId = req.user._id;
    let favorite = await Favorite.findOne({ userId })
      .populate("user")
      .populate("songs")
      .lean();
    if (favorite == null || favorite.length == 0)
      favorite = await Favorite.create({ userId, songId: [] });
    const song = await Song.findById(songId).lean();
    if (song == null)
      return Result.error(res, { message: "Bài hát không tồn tại" });
    if (favorite.songId != null && favorite.songId.length > 0) {
      console.log(favorite.songId);
      const checkInFavorite = favorite.songId.some((i) => i.equals(song._id));
      if (checkInFavorite)
        return Result.error(res, {
          message: "Bài hát đã tồn tại trong danh sách yêu thích",
        });
    } else favorite.songId = [];
    favorite.songId.push(song._id);
    const updatedFavorite = await Favorite.findOneAndUpdate(
      { _id: favorite._id },
      favorite,
      { new: true }
    );
    return Result.success(res, { updatedFavorite });
  } catch (err) {
    next(err);
  }
};

const removeSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const userId = req.user._id;
    let favorite = await Favorite.findOne({ userId })
      .populate("user")
      .populate("songs")
      .lean();
    if (favorite == null || favorite.length == 0) {
      favorite = await Favorite.create({ userId, songId: [] });
      return Result.error(res, {
        message: "Bài hát không tồn tại trong danh sách yêu thích",
      });
    }
    const song = await Song.findById(songId).lean();
    if (song == null)
      return Result.error(res, { message: "Bài hát không tồn tại" });
    if (favorite.songId != null && favorite.songId.length > 0) {
      const checkInFavorite = favorite.songId.some((i) => i.equals(song._id));
      if (!checkInFavorite)
        return Result.error(res, {
          message: "Bài hát không tồn tại trong danh sách yêu thích",
        });
    } else {
      favorite.songId = [];
      return Result.error(res, {
        message: "Bài hát không tồn tại trong danh sách yêu thích",
      });
    }
    favorite.songId = favorite.songId.filter((i) => !i.equals(song._id));
    const updatedFavorite = await Favorite.findOneAndUpdate(
      { _id: favorite._id },
      favorite,
      { new: true }
    );
    return Result.success(res, { updatedFavorite });
  } catch (err) {
    next(err);
  }
};

const favoriteController = {
  getMyFavorite,
  addSong,
  removeSong,
};

export default favoriteController;
