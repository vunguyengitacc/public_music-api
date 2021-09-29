import Result from "../../helpers/result.helper";
import Favorite from "./favorite.model";

const getMyFavorite = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const favorite = await Favorite.find({ userId })
      .populate("user")
      .populate("songs")
      .lean();
    return Result(res, { favorite });
  } catch (err) {
    next(err);
  }
};

const favoriteController = {
  getMyFavorite,
};

export default favoriteController;
