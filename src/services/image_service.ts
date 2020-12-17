import { Response, Request } from "express";
import ImageModel from "../models/images";
import { CustomError } from "../error";

interface SaveImageObject {
    originalname: string,
    mimetype: string,
    path: string,
    filename: string
}

interface AllImagesMongo {
    images: [{
        _id: string,
        originalname: string,
        path: string
    }]
}

export default class UploadService {

    public static async imageUpload(req: Request, res: Response) {
        const imageToSave: SaveImageObject = {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            path: req.file.path,
            filename: req.file.fieldname
        }

        await ImageModel.find({ originalname: imageToSave.originalname })
            .then((image) => {

                if (image.length === 0) {
                    const newImage = new ImageModel({
                        originalname: imageToSave.originalname,
                        mimetype: imageToSave.mimetype,
                        path: imageToSave.path,
                        filename: imageToSave.filename
                    });

                    newImage.save().then(() => {
                        res.send("Image saved")
                    }).catch((err) => {
                        const imageErr: CustomError = {
                            statusCode: 304,
                            message: err.message
                        }
                        res.send(imageErr)
                    })
                }
                else {
                    const dupError: CustomError = {
                        statusCode: 304,
                        message: "Image duplicate"
                    }

                    res.send(dupError);
                }

            }).catch((err) => {
                const saveErr: CustomError = {
                    statusCode: 304,
                    message: err.message
                }
                res.send(saveErr);
            });

    }

    public static async getAllImages(req: Request, res: Response) {
        await ImageModel.find()
            .then((results) => {

                let resultData: any = {
                    images: []
                }

                results.forEach((result) => {
                    resultData.images.push({
                        _id: result._id,
                        originalname: result.get("originalname"),
                        path: result.get("path")
                    })
                })

                let data: AllImagesMongo = resultData;
                res.send(data)
            }).catch((err) => {
                const findErr: CustomError = {
                    statusCode: 400,
                    message: err.message
                }
                res.send(findErr)
            })

    }
}

