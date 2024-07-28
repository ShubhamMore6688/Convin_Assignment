import express from "express";
import connectDB from "./Data/database.js";
import { config } from "dotenv";
import UserRouter from "./Routes/User.js"
import ExpenseRouter from "./Routes/Expense.js"
import ExcelRouter from "./Routes/Excel.js"
import cookieParser from "cookie-parser";

//express server
const app = express();

// provide the input data in the form of json
app.use(express.json());

// to retrive cookies from the response
app.use(cookieParser());

//configure .env file
config({
    path: "./Data/config.env"
})

//database connection
connectDB();

// user routes
app.use(UserRouter);

//expense router
app.use(ExpenseRouter);

//excel router
app.use(ExcelRouter);

app.listen(3000, ()=>{
    console.log("server started successfully");
})