import { model, Schema } from "mongoose";

const PlayingSongScheme = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    songId: { type: Schema.Types.ObjectId, ref: "songs" },
    startTime: Number,
    finishTime: Number,
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

PlayingSongScheme.virtual("user", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

PlayingSongScheme.virtual("song", {
  ref: "songs",
  localField: "songId",
  foreignField: "_id",
  justOne: true,
});

const PlayingSong = model("playing-lists", PlayingSongScheme);

export default PlayingSong;
