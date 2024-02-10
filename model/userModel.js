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
        type:String,
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
},{timestamps:true});

// Hasing the password
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,16)
    next();
})

UserSchema.methods.isPasswordCurrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.getJwtToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullName:this.fullName
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})

}




export const User=mongoose.model("User",UserSchema)