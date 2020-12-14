import { Request, Response } from "express";
import SignUpService from "../services/signUp_service";

export async function signUp(req: Request, res: Response) {
    const addNewUser = await SignUpService.signUpUser(req.body);

    if(addNewUser === undefined) res.status(200).send("User created")
    else{
        res.send(addNewUser)
    }
}