import { model, Schema } from 'mongoose';

const FavotireScheme = new Schema(
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

const Favorite = model('singers', FavotireScheme);

export default Favorite;