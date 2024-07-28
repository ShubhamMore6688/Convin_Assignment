import mongoose from "mongoose";

// user model
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be less that 50 characters long']
    },
    mobileno:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must have atleast 6 characters'],
        unique: true
    },
    expense: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expense'
    }]

}, {timestamps: true})


export const userModel = mongoose.model("user", UserSchema);
