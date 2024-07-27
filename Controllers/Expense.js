import { expenseModel } from "../Models/Expense.js";
import jwt, { decode } from "jsonwebtoken";

export const addExpense = async (req,res) => {
    try {
        const {token}  = req.cookies;
        const {description, amount} = req.body;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "login first"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY)
        const user = await userModel.findOne({_id: decoded.id});

        
        const expense = await expenseModel.create({
            description,
            amount,
            paidBy: decoded.id
        })
        user.expense = expense._id;


    } catch (error) {
         // if error occure this block is executes.
         res.status(500).json({
            message: error.message
        })
    }
}