import { getUserByEmail } from "../database/users";


const isDuplicateUser = async ({ email }: { email: string }) => {

}

export const userSignUp = async ({ email }: { email: string }) => {
    const isDuplicateUser = await getUserByEmail(email);

    if (isDuplicateUser.length != 0) {
      const badUserError: CustomError = {
        statusCode: 400,
        message: 'Bad Request'
      };
};
