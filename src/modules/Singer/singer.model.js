import { model, Schema } from "mongoose";

const SingerScheme = new Schema(
  {
    name: String,
    imageUrl: String,
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

SingerScheme.virtual("songs", {
  ref: "songs",
  localField: "songId",
  foreignField: "_id",
});

SingerScheme.index({ name: "text" });

const Singer = model("singers", SingerScheme);
export default Singer;
