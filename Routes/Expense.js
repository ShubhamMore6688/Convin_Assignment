import express from "express";
import { addExpense, getExpense, overallExpense } from "../Controllers/Expense.js";
import { UserAuthentication } from "../Middlewares/authentication.js";

const router = express.Router();

router.post("/addexpense", UserAuthentication, addExpense);
router.get("/individualexpense", UserAuthentication, getExpense);
router.get("/overallexpense", UserAuthentication, overallExpense);

export default router;