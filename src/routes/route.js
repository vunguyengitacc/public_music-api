import checkToken from "middlewares/token.middleware";
import AlbumRouter from "../modules/Album/album.route";
import AuthRouter from "../modules/Auth/auth.route";
import CategoryRouter from "../modules/Category/category.route";
import FavoriteRouter from "../modules/Favorite/favorite.route";
import SingerRouter from "../modules/Singer/singer.route";
import SongRouter from "../modules/Song/song.route";

const MasterRouter = (app) => {
  app.use("/api/auth", AuthRouter);
  app.use("/api/albums", AlbumRouter);
  app.use("/api/singers", SingerRouter);
  app.use("/api/categories", CategoryRouter);
  app.use("/api/songs", SongRouter);
  app.use("/api/favorites", checkToken, FavoriteRouter);
};

export default MasterRouter;
