import express, { Router, Response, Request } from "express";
import UserController from "./controllers/user_controller";
import WeatherController from "./controllers/weather_controller";
import AuthService from "./services/auth_service";

let router: Router = express.Router();

// need to run in cloud env
router.get("/", ((req: Request, res: Response) => { res.send('root'); }));

router.post("/api/v1/login", UserController.login);

router.post("/api/v1/signup", UserController.signUp);

router.get("/api/v1/temps", (req: Request, res: Response) => {
    res.status(501).send("Route not added yet. https://http.cat/501")
});

router.get("/api/v1/weather", WeatherController.getCurrentWeather);

export default router;