import { model, Schema } from 'mongoose';

const AlbumScheme = new Schema(
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

const Album = model('singers', AlbumScheme);

export default Album;