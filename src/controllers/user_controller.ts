import { Request, Response } from "express";
import { UserDetails } from "../types";
import UserModel from "../models/users";
import { CustomError } from "../error";
import { Document } from "mongoose";
import AuthService from "../services/auth_service";
import jwt from "jsonwebtoken";
require("dotenv").config();

export async function signUp(req: Request, res: Response) {
    const userDetails: UserDetails = req.body;

    await UserModel.find({ email: userDetails.email })
        .then((user) => {
            if (user.length >= 1) {
                const duplicateUser: CustomError = {
                    statusCode: 409,
                    message: "Auth Error"
                }
                res.send(duplicateUser);
            }
            else {
                AuthService.hashPassword(userDetails.password, 12, (err, hash) => {
                    if (err) {
                        const hashError: CustomError = {
                            statusCode: 400,
                            message: err.message
                        }
                        res.send(hashError);
                    } else {
                        const newUser: Document = new UserModel({
                            email: userDetails.email,
                            password: hash
                        });

                        newUser.save()
                            .then(() => {
                                res.send("User created")
                            }).catch(err => {
                                const newUserErr: CustomError = {
                                    statusCode: 400,
                                    message: err.message
                                }
                                res.send(newUserErr)
                            })
                    }
                });
            }
        });

}


export async function login(req: Request, res: Response) {
    const userDetails: UserDetails = req.body;
    await UserModel.find({ email: userDetails.email })
        .then((user) => {
            if (user.length === 0) {
                const noUser: CustomError = {
                    statusCode: 400,
                    message: "Auth Error"
                }

                res.send(noUser)
            } else {
                user[0].get("password");
                AuthService.compare(userDetails.password, user[0].get("password"), (error: string | null, match: boolean | null) => {
                    if (error) {
                        const password: CustomError = {
                            statusCode: 401,
                            message: "Auth Error"
                        }
                        res.send(password)
                    }
                    if (match) {

                        const token = jwt.sign({
                            email: user[0].get("email"),
                            userId: user[0].get("_id")
                        }, `${process.env.JWT_KEY}`, {
                            expiresIn: "1h"
                        })

                        res.status(200).send({
                            message: "Auth successful",
                            token: token
                        })
                    }
                })

            }
        });
}