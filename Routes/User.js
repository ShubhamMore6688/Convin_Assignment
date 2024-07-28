import express from "express";
import { CreateUser, GetUserDetails, LoginUser, LogoutUser, testController } from "../Controllers/User.js";
const router = express.Router();


router.post("/createuser", CreateUser);
router.get("/user", GetUserDetails);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);


router.get("/test", testController)

export default router;