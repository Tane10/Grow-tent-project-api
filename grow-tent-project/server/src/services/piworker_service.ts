import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express"
import { CustomError } from "../error";
import socketio from "socket.io";
import { Gpio } from "onoff";

export default class PIWorkerService {

    private stopOperation: boolean = false;

    public async loginLedDriver() {
        let loginLed = new Gpio(21, "out");

        const readLed = await loginLed.read((err, value) => {
            if (err) {
                throw err;
            }

            loginLed.write(value)
        });










    }





}