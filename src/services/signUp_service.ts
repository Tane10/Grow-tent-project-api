import { UserDetails } from "../types";
import UserModel from "../models/users";
import { CustomError } from "../error";
import AuthService from "./auth_service";
import { Document } from "mongoose";

export default class SignUpService {

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

    // private userData: UserDataInterface = parsedUserDetails;

    // private async validateUser(userDetails: reqUserDetail): Promise<string> {
    //     let token: string = "";

    //     this.userData.data.forEach((val) => {
    //         if (val.email === userDetails.email && val.password === userDetails.password) {
    //             token = val.token;
    //         }
    //     })

    //     return token;
    // };

    // public async checkUserCreds(userDetails: reqUserDetail): Promise<resUserDetail> {

    //     const isUserVaild: string = await this.validateUser(userDetails);

    //     let vaildUser: resUserDetail = {
    //         email: userDetails.email,
    //         password: userDetails.password,
    //         token: isUserVaild
    //     };

    //     return vaildUser;
    // }
}
