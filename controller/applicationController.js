import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../middleware/error.js";
import {Application} from "../model/applicationSchema.js"
 

export const employerGetAllApllication=asyncHandler(async(req,res,next)=>{
    const role=req.user.role

    if(role ==="jobseeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resources! ",400))
    }

    const {_id}=req.user._id

    const application=await Application.find({'employerID.user':_id})
    res.status(200).json({
        success:true,
        application,
    })

})

export const jobseekerGetAllAplication=asyncHandler(async(req,res,next)=>{
    const role=req.user.role
    if(role==="Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resource ",400))
    }

    const  {_id}=req.user._id

    const application=await Application.find({'applicantID.user':_id})

    res.status(200).json({
        success:true,
        application,
    })
})

export const jobseekerDeleteApplication=asyncHandler(async(req,res,next)=>{
    const role=req.user.role
    
    if(role==="Employer"){
        return next(new ErrorHandler("Employer is not allowed to delete this resource"))
    }

    const id=req.params

    let applocation=await Application.findById(id)
    if(!applocation){
        return next(new ErrorHandler("Oops , Application not found ",404))
    }
    await applocation.deleteOne();
    res.status(200).json({
        success:true,
        message:"Application Deleted Success Full"
    })


})