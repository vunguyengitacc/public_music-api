import { model, Schema } from "mongoose";

const AlbumDetailScheme = new Schema(
  {
    albumId: { type: Schema.Types.ObjectId, ref: "albums" },
    songId: { type: Schema.Types.ObjectId, ref: "songs" },
    mainSong: Boolean,
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    timestamps: true,
  }
);

AlbumDetailScheme.virtual("album", {
  ref: "albums",
  localField: "albumId",
  foreignField: "_id",
  justOne: true,
});

AlbumDetailScheme.virtual("song", {
  ref: "songs",
  localField: "songId",
  foreignField: "_id",
  justOne: true,
});

const AlbumDetail = model("album-details", AlbumDetailScheme);

export default AlbumDetail;
