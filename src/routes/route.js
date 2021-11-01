import checkToken from "middlewares/token.middleware";
import AlbumRouter from "../modules/Album/album.route";
import AuthRouter from "../modules/Auth/auth.route";
import CategoryRouter from "../modules/Category/category.route";
import FavoriteRouter from "../modules/Favorite/favorite.route";
import SearchRouter from "../modules/Search/search.route";
import SingerRouter from "../modules/Singer/singer.route";
import SongRouter from "../modules/Song/song.route";
import UserRouter from "../modules/User/user.route";

const MasterRouter = (app) => {
  app.use("/api/user", checkToken, UserRouter);
  app.use("/api/auth", AuthRouter);
  app.use("/api/albums", checkToken, AlbumRouter);
  app.use("/api/singers", checkToken, SingerRouter);
  app.use("/api/categories", checkToken, CategoryRouter);
  app.use("/api/songs", checkToken, SongRouter);
  app.use("/api/favorites", checkToken, FavoriteRouter);
  app.use("/api/search", checkToken, SearchRouter);
};

export default MasterRouter;
