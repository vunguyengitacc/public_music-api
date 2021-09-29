import { model, Schema } from "mongoose";

const CategoryScheme = new Schema(
  {
    name: { type: String, unique: true },
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

CategoryScheme.virtual("songs", {
  ref: "songs",
  localField: "songId",
  foreignField: "_id",
});

const Category = model("categories", CategoryScheme);

export default Category;
