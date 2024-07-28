import express from "express";
import { exportExpense } from "../Controllers/Excel.js";
const router = express.Router();


router.get("/download", exportExpense);


export default router;