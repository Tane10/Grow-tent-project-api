import { UserDetails } from "../types";
import UserModel from "../models/users";
import { CustomError } from "../error";
import AuthService from "./auth_service";
import { Document } from "mongoose";

export default class UserService {

    public static async signUpUser(userDetails: UserDetails): Promise<CustomError | undefined> {
        return await UserModel.find({ email: userDetails.email })
            .then((user) => {
                if (user.length >= 1) {
                    const duplicateUser: CustomError = {
                        statusCode: 409,
                        message: "Duplicate user creds"
                    }
                    return duplicateUser;
                }
                else {
                    let vaild: string | CustomError = "User created";

                    AuthService.hashPassword(userDetails.password, 12, (err, hash) => {
                        if (err) {
                            const hashError: CustomError = {
                                statusCode: 400,
                                message: err.message
                            }
                            vaild = hashError;
                            return vaild;
                        } else {
                            const newUser: Document = new UserModel({
                                email: userDetails.email,
                                password: hash
                            });

                            newUser.save()
                                .then((result) => {
                                    console.log(result);
                                }).catch(err => {
                                    const newUserErr: CustomError = {
                                        statusCode: 400,
                                        message: err.message
                                    }

                                    vaild = newUserErr;
                                    return vaild
                                })
                            return vaild
                        }
                    });

                }
            });
    }

    public static async loginUser(userDetails: UserDetails): Promise<CustomError | undefined> {
        return await UserModel.find({ email: userDetails.email })
            .then((user) => {
                if (user.length === 0) {
                    const noUser: CustomError = {
                        statusCode: 400,
                        message: "No user"
                    }
                    return noUser;
                } else {

                    const userDBPassword = user[0].get("password");

                   const compare =  AuthService.compare(userDetails.password, userDBPassword, (error: string | null, match: boolean | null) => {
                        if (error) {
                            const password: CustomError = {
                                statusCode: 401,
                                message: "Invaild credentials"
                            }
                            return password;
                            // passwords did not match
                        } else {
                            match = true;
                            console.log("match")
                            return match
                            // passwords match
                        }
                    })

                    console.log(compare)


                }
            })
    }



}
