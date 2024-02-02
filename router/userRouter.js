import express  from "express";
import {register,loginUser,userLogOut} from "../controller/userController.js"
import {isAuthorized} from "../middleware/auth.js"


const router=express.Router()

router.route("/register").post(register)
router.route("/login").post(loginUser)
router.route("/logout").get(isAuthorized,userLogOut)



export default router