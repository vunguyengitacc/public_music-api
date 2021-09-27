import { model, Schema } from "mongoose";

const FavotireScheme = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    songId: [{ type: Schema.Types.ObjectId, ref: "songs" }],
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    timestamps: true,
  }
);

FavotireScheme.virtual("songs", {
  ref: "songs",
  localField: "songId",
  foreignField: "_id",
});

FavotireScheme.virtual("user", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});
const Favorite = model("favorites", FavotireScheme);

export default Favorite;
