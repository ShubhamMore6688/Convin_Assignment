import express from "express";
import { addExpense } from "../Controllers/Expense.js";

const router = express.Router();

router.post("/addexpense", addExpense)


export default router;