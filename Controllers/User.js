import { userModel } from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// create new user
export const CreateUser = async(req, res) => {
    try {
        // get entered user details
        const {email, name, mobileno, password} = req.body;

        let user = await userModel.findOne({email});

        // user already present in the database
        if(user){
            // 409 for Conflict 
            return res.status(409).json({
                success: false,
                message: "user already present"
            })
        }
        
        const encyptpassword = await bcrypt.hash(password, 10);
        // if user is not present in the database create new user with given details
        user = await userModel.create({
            email,
            name,
            mobileno,
            password: encyptpassword
        })

       

        // 200 for success
        return res.status(200).json({
            success: true,
            message: "user created successfully"
        })

    } catch (error) {
        // if error occure this block is executes.
        res.status(500).json({
            message: error.message
        })
    }
}


// login user
export const LoginUser = async(req,res) => {
    try {
        const {email, password} = req.body;

        let user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "invalid password"
            })
        }

        
        const token = jwt.sign({id: user._id}, process.env.SECRETKEY);

        return res.cookie("token", token).status(200).json({
            success: true,
            message: "login successful"
        })


    } catch (error) {
        // if error occure this block is executes.
        res.status(500).json({
            message: error.message
        })
    }
}


//logout
export const LogoutUser = (req,res) => {
    try {
        
        return res.cookie("token", "", { 
            expires: new Date(Date.now()) 
        }).json({
            success: true,
            message: "logout successfully"
        })
    } catch (error) {
        // if error occure this block is executes.
        res.status(500).json({
            message: error.message
        })
    }
}

// get the user details
export const GetUserDetails = async(req,res) => {
    try {
       

        return res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        // if error occure this block is executes.
        res.status(500).json({
            message: error.message
        })
    }
}





