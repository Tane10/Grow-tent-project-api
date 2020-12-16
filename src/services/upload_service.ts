import { NextFunction, Response, Request } from "express";


export default class UploadService {

    public static async imageUpload(req: Request, res: Response) {

        console.log(req.file)

        res.send(req.file)

    }



}

