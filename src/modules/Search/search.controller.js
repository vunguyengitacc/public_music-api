import Result from "../../helpers/result.helper";
import Album from "../Album/album.model";
import Category from "../Category/category.model";
import Singer from "../Singer/singer.model";
import Song from "../Song/song.model";

const searchFullText = async (req, res, next) => {
  try {
    const { q } = req.query;
    const [songs, categories, singers, albums] = await Promise.all([
      Song.aggregate([{ $match: { $text: { $search: q } } }]),
      Category.aggregate([{ $match: { $text: { $search: q } } }]),
      Singer.aggregate([{ $match: { $text: { $search: q } } }]),
      Album.aggregate([{ $match: { $text: { $search: q } } }]),
    ]);
    return Result.success(res, { songs, singers, albums, categories });
  } catch (err) {
    next(err);
  }
};

const searchController = {
  searchFullText,
};

export default searchController;
