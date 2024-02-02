import mongoose from "mongoose";


const JobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Provide job titil"],
        minLength:[3,"Job title must contain at least 3 character"],
        maxLength:[50,"Job Title con't exceed 50 character"]
    },
    discription:{
        type:String,
        required:[true,"Please provide job discription"],

    },
    category:{
        type:String,
        required:[true,"Job category is required"]
    },
    country:{
        type:String,
        required:[true,"Job Country is Required"]
    },
    city:{
        type:String,
        required:[true,"Please provide Job city"]
    },
    location:{
        type:String,
        required:[true,"Please provide exact location"]
    },
    fixedSalary:{
        type:Number,
        required:true
    },
    salaryFrom:{
        type:Number,
        required:true
    },
    salaryTo:{
        type:Number,
        required:true
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }


},{timestamps:true})





export const Job=mongoose.model("Job",JobSchema)