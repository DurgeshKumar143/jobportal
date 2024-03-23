import express   from "express";
import {getAllJob,postJob,getmyJob,updateJob,deleteJob,getSingleJob} from "../controller/jobController.js"
import {isAuthorized} from "../middleware/auth.js"

const router=express.Router()

router.route("/jobs").get(getAllJob)
router.route("/post").post(isAuthorized,postJob)

router.route("/myjob").get(isAuthorized,getmyJob)

router.route("/update/:id").put(isAuthorized,updateJob)

router.route("/delete/:id").delete(isAuthorized,deleteJob)
router.route("/:id").get(isAuthorized,getSingleJob)



export default router