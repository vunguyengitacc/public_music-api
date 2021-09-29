import { model, Schema } from "mongoose";

const SongScheme = new Schema(
  {
    name: String,
    singerId: { type: Schema.Types.ObjectId, ref: "singers" },
    categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
    lyrics: String,
    time: Number,
    imageUrl: String,
    releaseDate: Date,
    songUrl: String,
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    timestamps: true,
  }
);

SongScheme.virtual("singer", {
  ref: "singers",
  localField: "singerId",
  foreignField: "_id",
  justOne: true,
});

SongScheme.virtual("category", {
  ref: "categories",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

const Song = model("songs", SongScheme);

export default Song;
