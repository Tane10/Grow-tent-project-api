import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const UserModel = model('users', UserSchema);

export default UserModel;
