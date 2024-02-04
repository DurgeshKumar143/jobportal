import express from "express";

import {employerGetAllApllication,jobseekerGetAllAplication,jobseekerDeleteApplication} from "../controller/applicationController.js"
import {isAuthorized} from "../middleware/auth.js"
const router=express.Router()


router.route("/jgetallapplication").get(isAuthorized,jobseekerGetAllAplication)
router.route("/egetallapplication").get(isAuthorized,employerGetAllApllication)
router.route("/delete/:id").delete(isAuthorized,jobseekerDeleteApplication)

 

 


export default router