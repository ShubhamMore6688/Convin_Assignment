import express from "express";
import { CreateUser, GetUserDetails, LoginUser, LogoutUser} from "../Controllers/User.js";
const router = express.Router();


router.post("/createuser", CreateUser);
router.get("/user", GetUserDetails);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);



export default router;