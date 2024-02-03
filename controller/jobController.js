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

export const postJob=asyncHandler(async(req,res,next)=>{
     
    const role=req.user.role
   

    if(role ==="jobseeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resources! ",400))
    }
    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo}=req.body
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("All Fields is Required",409))
    }
    
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please either provide fixed salary or range salary",400))
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Con't enter salary and range salary together"))
    }

    const postedBy=req.user._id

    const job=await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        salaryFrom,
        salaryTo,
        postedBy
    })

    res.status(200).json({
        success:true,
        message:"Job Posted Success Fully",
        job
    })

})


export  const getmyJob=asyncHandler(async(req,res,next)=>{
    const role=req.user.role
    if(role ==="jobseeker"){
        return next(new ErrorHandler("Job seeker is not allowed to find your job  ",400))
    }

    const myjobs=await Job.find({postedBy:req.user._id});
    if(!myjobs){
        return next(new ErrorHandler("You are not posted any job",400))
    }

    res.status(200).json({
        success:true,
        myjobs,

    })
})


export const updateJob=asyncHandler(async(req,res,next)=>{
    const role=req.user.role
    if(role ==="jobseeker"){
        return next(new ErrorHandler("Job seeker is not allowed to find your job  ",400))
    }

    const {id}=req.params;
    console.log("This is job section to find ",id)
    let job=await Job.findById(id);
    console.log("This is job find user ",job)
    if(!job){
        return next(new ErrorHandler("Oops , Job Not Found ",404))
    }
    job=await Job.findByIdAndUpdate(id,req.body,{
        new :true,
        runValidators:true,
        
    })

    res.status(200).json({
        success:true,
        job,
        message:"Job Updated SuccessFully"
    })
})