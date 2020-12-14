import { Request, Response } from "express";
import UserService from "../services/user_service";

export async function signUp(req: Request, res: Response) {
    const addNewUser = await UserService.signUpUser(req.body);

    if(addNewUser === undefined) res.status(200).send("User created")
    else{
        res.send(addNewUser)
    }
}


export async function login(req: Request, res: Response) {
    const loginUser = await UserService.loginUser(req.body);

    if(loginUser === undefined) res.status(200).send("Login")
    else{
        res.send(loginUser)
    }
}