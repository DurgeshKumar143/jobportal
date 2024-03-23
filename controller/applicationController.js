import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../middleware/error.js";
import {Application} from "../model/applicationSchema.js"
import {v2 as cloudinary} from 'cloudinary';
import { Job } from "../model/jobModel.js";



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


export const postApllication=asyncHandler(async(req,res,next)=>{
    const role=req.user.role
     
    if(role==="Employer"){
        return next(new ErrorHandler("Employer is not allowed to post job"))
    }

    const {resume}=req.files;
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Resume file Required"))
    }

    const allowedFormate=['image/jpeg','image/png','image/webp']
    if(!allowedFormate.includes(resume.mimetype)){
        return next(new ErrorHandler("Invalid file type, Please upload a PNG JPG AND WEBP file",400))

    }


    

    const {name,email,coverleter,mobile,address,jobId}=req.body

    const applicantID={
        user:req.user._id,
        role:"jobseeker"
    }

    console.log("This is applicationId ",applicantID)
    if(!jobId){
        return next(new ErrorHandler("Job not found ",404))
    }

    const jobDetails=await Job.findById(jobId)
    if(!jobDetails){
        return next(new ErrorHandler("Job Not Found ",404))
    }

    const employerID={
        user:jobDetails.postedBy,
        role:"Employer"
    }
     
    if(!name || !email || !coverleter || !mobile || !address || !applicantID || !employerID || !resume ){
        return next(new ErrorHandler("Please Fill all field ",400))
    }

    // THis is to upload  the resume to the cloudinary server
    const cloudinaryResponse= await cloudinary.uploader.upload(resume.tempFilePath)

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error : ",cloudinaryResponse.error || "Unknown Cloudinary error")

        return next(new ErrorHandler("Failed to upload resume ",404))
    }

    console.log("Name is  ",name);
    console.log("Email is  ",email);
    console.log("CoverLetter is  ",coverleter);
    console.log("Mobile is  ",mobile);
    console.log("Address is  ",address);
    console.log("ApplicantID is  ",applicantID);
    console.log("EmployerID is  ",employerID);
    console.log("Resume is public id is   ",cloudinaryResponse.public_id);
    console.log("Resume is resume url url is   ",cloudinaryResponse.secure_url);

    

    

    const application=await Application.create({
        name,email,coverleter,mobile,address,
        applicantID,employerID,
        resume:{public_id:cloudinaryResponse.public_id,url:cloudinaryResponse.secure_url}

    })

    res.status(200).json({
        success:true,
        application
    })





})