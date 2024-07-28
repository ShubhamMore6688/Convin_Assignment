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
    },
    sharedType: {
        type: String,
        enum: ['EXACT','EQUAL','PERCENTAGE'],
        default: 'EQUAL',
    },
    shares:  [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
        amount: {type: Number}
    }]


}, {timestamp: true})


export const expenseModel = mongoose.model("expense", ExpenseSchema);