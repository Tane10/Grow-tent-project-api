import { Request, Response } from "express";
import { UserDetails } from "../types";
import { CustomError } from "../error";
import AuthService from "../services/auth_service";
import jwt from "jsonwebtoken";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
require("dotenv").config();


interface WeatherObject {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    name: string,

}
export default class WeatherController {

    public config: AxiosRequestConfig = {
        headers: {
            "content-type": "application/json"
        }
    };

    public static async getCurrentWeather(req: Request, res: Response) {

        const locationString = req.query.location;

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${locationString}&appid=${process.env.OPEN_WEATHER_KEY}&units=metric`;

        try {
            let openWeatherMap = await axios.get(url);

            let weatherData = openWeatherMap.data;

            const weatherObject: WeatherObject = {
                temp: weatherData.main.temp,
                feels_like: weatherData.main.feels_like,
                temp_min: weatherData.main.temp_min,
                temp_max: weatherData.main.temp_max,
                pressure: weatherData.main.pressure,
                humidity: weatherData.main.humidity,
                name: openWeatherMap.data.name,
            }

            res.status(200).send(weatherObject);
        }
        catch (err) {
            console.log(err)
            res.status(400).send("Bad Request")
            throw err;
        }

    }

}
