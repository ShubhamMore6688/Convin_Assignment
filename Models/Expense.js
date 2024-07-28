import mongoose from "mongoose";



// expense schema
const ExpenseSchema = mongoose.Schema({
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: [true, 'Description is required'],
        min: [0, 'Amount must be a positive number']
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Paidby is required']
    },
    sharedType: {
        type: String,
        enum: {
            values: ['EXACT','EQUAL','PERCENTAGE'],
            message: 'shared type must be one of this'
        },
        default: 'EQUAL',
    },
    shares:  [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        description: {type: String},
        amount: {
            type: Number,
            min: [0, 'amount must be a positive number'],
        },
    }],


}, {timestamps: true})


export const expenseModel = mongoose.model("expense", ExpenseSchema);