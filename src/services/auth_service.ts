import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../error';

export default class AuthService {
  protected saltRounds = 12;

  public hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, this.saltRounds);
  };

  public compare = async (
    password: string,
    dbHash: string
  ): Promise<boolean> => {
    return bcrypt.compare(password, dbHash);
  };

  public static checkIfVaild = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const incomingToken = req.headers.authorization?.split(' ')[1];
      if (incomingToken !== undefined) {
        jwt.verify(incomingToken, `${process.env.JWT_KEY}`);
        next();
      }
    } catch (err) {
      const failed: CustomError = {
        statusCode: 401,
        message: err.message
      };
      return res.send(failed);
    }
  };
}
