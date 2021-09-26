import { model, Schema } from 'mongoose';

const SongScheme = new Schema(
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

const Song = model('songs', SongScheme);

export default Song;