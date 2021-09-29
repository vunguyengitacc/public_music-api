import Result from "../../helpers/result.helper";
import Song from "../Song/song.model";
import Favorite from "./favorite.model";

const getMyFavorite = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const favorite = await Favorite.find({ userId })
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
    const songId = req.body.songId;
    const userId = req.user._id;
    const favorite = await Favorite.find({ userId })
      .populate("user")
      .populate("songs")
      .lean();
    if (favorite.length == 0) favorite = await Favorite.create({ userId });
    const song = await Song.findById(songId).lean();
    if (song == null)
      return Result.error(res, { message: "Bài hát không tồn tại" });
    const checkInFavorite = favorite.songId.some((i) => i.equal(song._id));
    if (checkInFavorite)
      return Result.error(res, {
        message: "Bài hát đã tồn tại trong danh sách yêu thích",
      });
    favorite.songId.push(song._id);
    const updatedFavorite = await Favorite.findOneAndUpdate(
      { _id: favorite._id },
      favorite,
      { new: true }
    );
    return Result.success(res, { favorite });
  } catch (err) {
    next(err);
  }
};

const removeSong = async (req, res, next) => {
  try {
    const songId = req.body.songId;
    const userId = req.user._id;
    const favorite = await Favorite.find({ userId })
      .populate("user")
      .populate("songs")
      .lean();
    if (favorite.length == 0) favorite = await Favorite.create({ userId });
    const song = await Song.findById(songId).lean();
    if (song == null)
      return Result.error(res, { message: "Bài hát không tồn tại" });
    const checkInFavorite = favorite.songId.some((i) => i.equal(song._id));
    if (!checkInFavorite)
      return Result.error(res, {
        message: "Bài hát không tồn tại trong danh sách yêu thích",
      });
    favorite = favorite.songId.filter((i) => !i.equal(song._id));
    const updatedFavorite = await Favorite.findOneAndUpdate(
      { _id: favorite._id },
      favorite,
      { new: true }
    );
    return Result.success(res, { favorite });
  } catch (err) {
    next(err);
  }
};

const favoriteController = {
  getMyFavorite,
};

export default favoriteController;
