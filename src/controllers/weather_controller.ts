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

        const url = `api.openweathermap.org/data/2.5/weather?q=Rayleigh&appid=23a60634a56a8270f2050f0e7161a866&units=metric`;


        // const config = {
        //     method: 'get',
        //     url: 'api.openweathermap.org/data/2.5/weather?q=Rayleigh&appid=23a60634a56a8270f2050f0e7161a866&units=metric',
        //     headers: {}
        // };

        try {
            let weatherData = await axios.get(url);

            console.log(weatherData)


            // const weatherObject: WeatherObject = {
            //     temp: weatherData.data.temp,
            //     feels_like: weatherData.data.feels_like,
            //     temp_min: weatherData.data.temp_min,
            //     temp_max: weatherData.data.temp_max,
            //     pressure: weatherData.data.pressure,
            //     humidity: weatherData.data.humidity,
            //     name: weatherData.data,
            // }
            // res.status(200).send(weatherObject);
        }
        catch (err) {
            console.log(err)
            res.status(400).send("Bad Request")
            throw err;
        }

    }

}
