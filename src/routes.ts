import express, { Router, Response, Request } from "express";
import UserController from "./controllers/user_controller";
import AuthService from "./services/auth_service";
import ImageService from "./services/image_service";
import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

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

router.get("/api/v1/temps", (req: Request, res: Response) => {
    res.status(501).send("Route not added yet. https://http.cat/501")
});

router.post("/api/v1/image/upload", AuthService.checkIfVaild, parser.single("image"), ImageService.imageUpload);

router.get("/api/v1/image/get", ImageService.getAllImages);

export default router;