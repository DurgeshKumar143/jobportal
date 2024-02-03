import mongoose from "mongoose"
import validator from "validator";

const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:[3,"Name must be contain at least 3 character"],
        maxLength:[30,"Name can't exceed 30 character"]
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please provide a valid email"],
        required:[true,"Email is required field "]
    },
    coverleter:{
        type:String,
        required:[true,"Please provide you cover letter"]
    },
    mobile:{
        type:Number,
        required:[true,"Please provide your mobile number "]
    },
    address:{
        type:String,
        required:[true,"Please provide your address"]
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicationID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["joobseeker"],
            required:true
        }

    }, 
    employerId:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }

    }


},{timestamps:true})



export const Application=mongoose.model("Application",applicationSchema)