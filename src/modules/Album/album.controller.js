import Album from "./album.model";
import Song from "../Song/song.model";
import Result from "../../helpers/result.helper";

const getAll = async (req, res, next) => {
  try {
    const albums = await Album.find().populate("mainSong").lean();
    return Result.success(res, { albums });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const albums = await Album.findById(albumId)
      .populate("mainSong")
      .populate("songs")
      .lean();
    return Result.success(res, { albums });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.mainSongId == null)
      return Result.error(res, { message: "Album phải có bài hát chủ đề" });
    const songId = [...data.songId];
    songId.forEach((i) => {
      (async () => {
        let song = await Song.findById(i).lean();
        if (!song)
          return Result.error(res, { message: "Bài hát không tồn tại" });
      })();
    });
    const newAlbum = await Album.create(data);
    return Result.success(res, { newAlbum });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const songId = [...data.songId];
    if (songId && songId.length > 0) {
      songId.forEach((i) => {
        (async () => {
          let song = await Song.findById(i).lean();
          if (song == null)
            return Result.error(res, { message: "Bài hát không tồn tại" });
        })();
      });
    }
    const { albumId } = req.params;
    const updatedAlbum = await Album.findOneAndUpdate({ _id: albumId }, data, {
      new: true,
    });
    return Result.success(res, { updatedAlbum });
  } catch (err) {
    next(err);
  }
};

const addToAlbum = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { albumId } = req.params;
    const song = await Song.findById(data.songId).lean();
    if (song == null)
      return Result.error(res, { message: "Bài hát không tồn tại" });
    const updatedAlbum = await Album.findOneAndUpdate(
      { _id: albumId },
      { $push: { songId: data.songId } },
      {
        new: true,
      }
    );
    return Result.success(res, { updatedAlbum });
  } catch (err) {
    next(err);
  }
};

const albumController = {
  getAll,
  getOne,
  create,
  update,
  addToAlbum,
};

export default albumController;
