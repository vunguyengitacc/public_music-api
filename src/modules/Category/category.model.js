import { model, Schema } from 'mongoose';

const CategoryScheme = new Schema(
    {

    },
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
        },
        timestamps: true,
    }
)

const Category = model('singers', CategoryScheme);

export default Category;