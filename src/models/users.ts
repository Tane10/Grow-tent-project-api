import { Model, model, Schema, Document, Types } from 'mongoose';

const UserSchema: Schema<string> = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

let UserModel: Model<Document, {}> = model("users", UserSchema);

export default UserModel;