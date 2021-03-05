import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import routes from "./routes";
import dbConnect from "./dbconfig";
import socketio from "socket.io";
require("dotenv").config()

const app: Application = express();

/** 
 * options for cors midddleware
 * Documentation: https://expressjs.com/en/resources/middleware/cors.html
 */
const options: CorsOptions = {
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};

// middleware
app.use(helmet());
app.use(cors(options));
app.use(express.json());
app.set("port", process.env.PORT || 5000);
app.options("*", cors(options)); //enable pre-flight

// use all endpoints
app.use(routes);

// set up socket.io and bind to server
let http = require("http").Server(app);
let io = require("socket.io")(http);

try {
    io.on("connection", (socket: any) => {
        console.log("user connected");


        socket.emit("message", "you are now connected")

        // socket.on('login', (message: any) => {
        //     console.log("user logged in")
        // })
        socket.emit("message", "you are now connected")
    });


    http.listen(app.get("port"), async () => {
        await dbConnect();
        console.log("the server is running on port",
            app.get("port")
        );
    });

} catch (err) {
    console.log(err);
}