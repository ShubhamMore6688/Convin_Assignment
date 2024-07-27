import mongoose from "mongoose";



// expense schema
const ExpenseSchema = mongoose.Schema({
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }

}, {timestamp: true})


export const expenseModel = mongoose.model("expense", ExpenseSchema);