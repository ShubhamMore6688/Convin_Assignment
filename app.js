import express from "express";
import connectDB from "./Data/database.js";
import { config } from "dotenv";

//express server
const app = express();

//configure .env file
config({
    path: "./Data/config.env"
})

//database connection
connectDB();


app.listen(3000, ()=>{
    console.log("server started successfully");
})