import { model, Schema } from 'mongoose';

const SingerScheme = new Schema(
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

const Singer = model('singers', SingerScheme);

export default Singer;