import UserModel, { UserDocument } from '../schema/user.schema';

export const getUserByEmail = async (
  email: string
): Promise<UserDocument[]> => {
  const res = await UserModel.find({ email });
  return res;
};
