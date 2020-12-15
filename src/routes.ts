import express, { Router, Response, Request } from "express";
import { signUp, login } from "./controllers/user_controller";
// import { login } from "./controllers/login_controller";
// import { registerUser, updateUser, deleteUser, getUsers } from "./controllers/user_controller";
// import { uploadImage } from "./controllers/upload_controller";
// import { searchImage } from "./controllers/search_controller"
import AuthService from "./services/auth_service";

var router: Router = express.Router();

// need to run in cloud env
router.get("/", ((req: Request, res: Response) => { res.send('root'); }));

router.post("/api/v1/login", login);

router.post("/api/v1/signup", AuthService.checkIfVaild, signUp);


router.get("/api/v1/temps", (getTemps) => {

});

router.post("/api/v1/image/upload", (upload) => {

});

router.get("/api/v1/image/get", (getImages) => {

});


export default router;