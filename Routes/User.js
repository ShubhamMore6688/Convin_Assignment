import express from "express";
import { CreateUser, GetUserDetails, LoginUser, LogoutUser} from "../Controllers/User.js";
import { UserAuthentication } from "../Middlewares/authentication.js";
const router = express.Router();


router.post("/createuser", CreateUser);
router.get("/user", UserAuthentication, GetUserDetails);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);



export default router;