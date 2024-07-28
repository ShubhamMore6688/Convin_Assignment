import express from "express";
import { exportIndividualExpense } from "../Controllers/IndividualExpenseSheet.js";
import { exportOverallExpense } from "../Controllers/OverallExpenseSheet.js";
import { UserAuthentication } from "../Middlewares/authentication.js";
const router = express.Router();


router.get("/download",UserAuthentication, exportOverallExpense);
router.get("/download-individual", UserAuthentication, exportIndividualExpense);


export default router;