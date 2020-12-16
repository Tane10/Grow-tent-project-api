import express, { Router, Response, Request } from "express";
import UserController from "./controllers/user_controller";
import AuthService from "./services/auth_service";
import UploadService from "./services/upload_service";
import cloudinary from "cloudinary";
import multer from "multer";
import  { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage: CloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "Plants",
        allowed_formats: ["jpg", "png"]
    }
});

const parser: multer.Multer = multer({ storage: storage });

let router: Router = express.Router();

// need to run in cloud env
router.get("/", ((req: Request, res: Response) => { res.send('root'); }));

router.post("/api/v1/login", UserController.login);

router.post("/api/v1/signup", AuthService.checkIfVaild, UserController.signUp);

router.get("/api/v1/temps", (getTemps) => { });

router.post("/api/v1/image/upload", parser.single("image"), UploadService.imageUpload);

router.get("/api/v1/image/get", (getImages) => {

});


export default router;