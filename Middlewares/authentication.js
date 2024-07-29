import jwt from "jsonwebtoken";
import { userModel } from "../Models/User.js";

export const UserAuthentication = async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            // 401 for Unauthorized
            return res.status(401).json({
                success: false,
                message: "login first"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY);

         // get the current logged user
         const user = await userModel.findOne({_id: decoded.id});

         req.user = user;

         next();
    } catch (error) {
        // if error occure this block is executes.
        res.status(500).json({
            message: error.message
        })
    }
}