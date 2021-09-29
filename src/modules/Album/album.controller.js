import Album from "./album.model";
import Result from "../../helpers/result.helper";

const getAll = async (req, res, next) => {
  try {
    const albums = await Album.find().populate("main-song").lean();
    return Result.success(res, { albums });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const albumId = req.params;
    const albums = await Album.findById(albumId)
      .populate("songs")
      .populate("main-song")
      .lean();
    return Result.success(res, { albums });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const newAlbum = await Album.create(data);
    return Result.success(res, { newAlbum });
  } catch (err) {
    next(err);
  }
};

const albumController = {
  getAll,
  getOne,
  create,
};

export default albumController;
