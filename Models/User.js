import mongoose from "mongoose";

// user model
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    mobileno:{
        type: String,
        required: true,
        unique: true
    },
    expense: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expenseModel'
    }]

}, {timestamps: true})


export const userModel = mongoose.model("user", UserSchema);
