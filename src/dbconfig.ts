import mongoose from 'mongoose';
require("dotenv").config();

export default async function connectToPlantDB(): Promise<void> {
    mongoose.Promise = global.Promise;

    mongoose.connection.once("open", () => console.log("connected to database"));

    try {
        mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "master_pi_unit_db" })
    } catch (error) {
        console.log(error)
    }
}