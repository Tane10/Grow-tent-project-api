import { Model, model, Schema, Document } from 'mongoose';

const ImageSchema: Schema<string> = new Schema({
    originalname: { type: String, required: true },
    mimetype: String,
    path: { type: String, required: true },
    filename: { type: String, required: true }
});

let ImageModel: Model<Document, {}> = model("images", ImageSchema);

export default ImageModel;