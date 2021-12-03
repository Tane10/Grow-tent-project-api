import { Request, Response } from 'express';
import { getUserByEmail } from '../database/users';
import { User } from '../types/user.types';
import { CustomError } from '../error';
import { userSignUp } from '../services/user.service';

export default class UserController {
  public signUp = async (req: Request, res: Response) => {
    const requestBody: User = req.body;

    const request = await userSignUp(requestBody);
  };
}
