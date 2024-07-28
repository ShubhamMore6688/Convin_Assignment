import express from "express";
import { addExpense, getExpense, overallExpense } from "../Controllers/Expense.js";

const router = express.Router();

router.post("/addexpense", addExpense)
router.get("/indexpense", getExpense);
router.get("/overallexp", overallExpense)

export default router;