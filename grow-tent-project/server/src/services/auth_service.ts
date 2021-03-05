import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express"
import { CustomError } from "../error";

export default class AuthService {
    public static hashPassword(password: string, rounds: number, callback: (error: Error, hash: string) => void): void {
        bcrypt.hash(password, rounds, (error, hash) => {
            callback(error, hash);
        });
    }

    public static compare(password: string, dbHash: string, callback: (error: string | null, match: boolean | null) => void): void {
        bcrypt.compare(password, dbHash, (err: Error, match: boolean) => {
            if (match) {
                // passwords match
                callback(null, true);
            } else {
                // passwords do not match
                callback('Invalid password match', null);
            }
        });
    }

    public static checkIfVaild(req: Request, res: Response, next: NextFunction) {
        try {
            const incommingToken = req.headers.authorization?.split(" ")[1];
            if(incommingToken !== undefined) {
                jwt.verify(incommingToken, `${process.env.JWT_KEY}`);
                next();
            }
        } catch (err) {
            const failed: CustomError = {
                statusCode: 401,
                message: err.message
            }
            return res.send(failed)
        }
    }
}