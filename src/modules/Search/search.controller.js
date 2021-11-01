import Result from "../../helpers/result.helper";
import Album from "../Album/album.model";
import Song from "../Song/song.model";

const searchFullText = async (req, res, next) => {
  try {
    const { q } = req.query;
    const [songs, albums] = await Promise.all([
      Song.aggregate([
        {
          $match: {
            $text: { $search: q, $caseSensitive: false },
          },
        },
        {
          $sort: { score: { $meta: "textScore" } },
        },
      ]),
      Album.aggregate([
        {
          $match: { $text: { $search: q, $caseSensitive: false } },
        },
        {
          $sort: { score: { $meta: "textScore" } },
        },
      ]),
    ]);
    return Result.success(res, { songs, albums });
  } catch (err) {
    next(err);
  }
};

const searchController = {
  searchFullText,
};

export default searchController;
