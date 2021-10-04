import { model, Schema } from "mongoose";

const SongScheme = new Schema(
  {
    name: { type: String },
    singerId: { type: Schema.Types.ObjectId, ref: "singers" },
    categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
    lyrics: { type: String },
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

SongScheme.index({ name: "text", lyrics: "text" });

const Song = model("songs", SongScheme);

export default Song;
