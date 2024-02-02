import mongoose from "mongoose";
import validator from "validator";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

const UserSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"Please provide your name"],
        maxLegth:[30,"Name connot exceed more then 30 character"],
        minLength:[3,"Name must me contain at least 3 character"]
    },
    email:{
        type:String,
        required:[true,"Please provide the email Address"],
        validator:[validator.isEmail, "Please provide a valid email"],
        unique:[true,"This email already exits"]
    },
    mobile:{
        type:Number,
        required:[true,"Please provide a number"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide you password"],   
    },
    role:{
        type:String,
        required:[true,"Please Provide you role"],
        enum:["jobseeker","Employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
},{timestamps:true})




export const user=mongoose.model("User",UserSchema)