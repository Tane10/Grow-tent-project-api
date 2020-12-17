import { model, Schema } from 'mongoose';

const ImageSchema = new Schema({
    originalname: { type: String, required: true },
    mimetype: String,
    path: { type: String, required: true },
    filename: { type: String, required: true }
});

let ImageModel = model("images", ImageSchema);

export default ImageModel;