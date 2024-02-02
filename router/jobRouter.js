import express   from "express";
import {getAllJob} from "../controller/jobController.js"

const router=express.Router()

router.route("/jobs").get(getAllJob)



export default router