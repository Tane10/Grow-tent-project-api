import { UserDataInterface } from "../types";
import { parsedUserDetails } from "./data_service";

interface reqUserDetail {
    email: string,
    password: string
}

export interface resUserDetail extends reqUserDetail {
    token: string
}

export default class LoginService {

    private userData: UserDataInterface = parsedUserDetails;

    private async validateUser(userDetails: reqUserDetail): Promise<string> {
        let token: string = "";

        this.userData.data.forEach((val) => {
            if (val.email === userDetails.email && val.password === userDetails.password) {
                token = val.token;
            }
        })

        return token;
    };

    public async checkUserCreds(userDetails: reqUserDetail): Promise<resUserDetail> {

        const isUserVaild: string = await this.validateUser(userDetails);

        let vaildUser: resUserDetail = {
            email: userDetails.email,
            password: userDetails.password,
            token: isUserVaild
        };

        return vaildUser;
    }
}
