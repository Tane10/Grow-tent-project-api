import { Request, Response } from "express";
import LoginService, { resUserDetail } from "../services/login_service";
import {CustomError} from "../error";

const loginService = new LoginService;

export async function login(req: Request, res: Response) {
    const userCreds: resUserDetail = await loginService.checkUserCreds(req.body);

    if (userCreds.token !== "") res.status(200).send({ data: { token: userCreds.token } })
    else {
        const noToken: CustomError = {
            statusCode: 401,
            message: "This user can not be found, please use vaild creds"
        }
        res.send(noToken);
    }
}