import mongoose, { Schema, Document } from 'mongoose';

export interface ImageDocument extends Document {
  originalName: string;
  mimetype: string;
  path: string;
  filename: string;
}

const ImageSchema = new Schema({
  originalName: { type: String, required: true },
  mimetype: String,
  path: { type: String, required: true },
  filename: { type: String, required: true }
});

export default mongoose.model<ImageDocument>('Images', ImageSchema);
