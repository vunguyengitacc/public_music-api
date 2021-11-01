import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./db/connect";
import Result from "./helpers/result.helper";
import MasterRouter from "./routes/route";

const app = express();
dotenv.config();
connectDB();

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MasterRouter(app);

const port = process.env.PORT || 8080;

app.use(function (err, req, res, next) {
  console.log(err.stack);
  return Result.error(res, { message: err.message }, 500);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
