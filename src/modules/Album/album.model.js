import { model, Schema } from "mongoose";

const AlbumScheme = new Schema(
  {
    name: String,
    imageUrl: String,
    releaseDate: Date,
    songId: [{ type: Schema.Types.ObjectId, ref: "songs" }],
    mainSongId: { type: Schema.Types.ObjectId, ref: "songs" },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    timestamps: true,
  }
);

// AlbumScheme.virtual("mainSong", {
//   ref: "songs",
//   localField: "mainSongId",
//   foreignField: "_id",
// });

// AlbumScheme.virtual("songs", {
//   ref: "songs",
//   localField: "songId",
//   foreignField: "_id",
// });

AlbumScheme.virtual("album-detail", {
  ref: "album-details",
  localField: "_id",
  foreignField: "albumId",
});

const Album = model("albums", AlbumScheme);

export default Album;
