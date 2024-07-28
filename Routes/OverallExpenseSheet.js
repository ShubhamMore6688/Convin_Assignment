import express from "express";
import { exportIndividualExpense } from "../Controllers/IndividualExpenseSheet.js";
import { exportOverallExpense } from "../Controllers/OverallExpenseSheet.js";
const router = express.Router();


router.get("/download", exportOverallExpense);
router.get("/download-individual", exportIndividualExpense);


export default router;