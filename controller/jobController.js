import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../middleware/error.js";
import { Job } from "../model/jobModel.js";

export const getAllJob=asyncHandler(async(req,res,next)=>{
    const jobs=await Job.find({expired:false})
    res.status(200).json({
        success:true,
        jobs
    })
})