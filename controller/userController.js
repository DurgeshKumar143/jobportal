import  asyncHandler from "../utils/asyncHandler.js";
 import {User} from "../model/userModel.js"
import ErrorHandler from "../middleware/error.js";
import { sendTOken } from "../utils/jwtToken.js";

export const register=asyncHandler(async(req,res,next)=>{
    const {fullName,password,email,mobile,role}=req.body


    if(!fullName || !password || !email || !mobile || !role){  
        return next(new ErrorHandler("All Field is required",400))
    }
    
    const UserExit= await User.findOne({
        $or:[{email}]
    })

    if(UserExit){
        
        return next(new ErrorHandler("User Already exits",400))
    }
    

    const user= await User.create({
        fullName,
        email,
        mobile,
        password,
        role
        })

    const createdUser=await User.findById(user._id).select("-password")

    if(!createdUser){
        return next(new ErrorHandler("Something went wrong when RegisterUser",409))
    }

     sendTOken(user,200,res,"User Created SuccessFully")
    
})


// This is login section 

export const loginUser=asyncHandler(async(req,res,next)=>{
    // req->body Data
  // userName Email
  // find the user
  // password check
  // access and refresh token
  // send token coockie
  // send response to login

  const {email,password,mobile}=req.body

  if(!email || !password){
    
    return next(new ErrorHandler("Provide all Requirment",403))
  }

   

//   const user=await User.findOne({
//     $or:[{email},{mobile}]
//   })

const user=await User.findOne({email:email})


  if(!user){
    return next(new ErrorHandler("User Not exit",403))
  }
const isPassWordCurrect=await user.isPasswordCurrect(password)

if(!isPassWordCurrect){
    return next(new ErrorHandler("Invalid User Credentials"))
}

sendTOken(user,200,res,"User Login Successfully")


})



export const userLogOut=asyncHandler(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"User logged Out successFully"
    })
})


export const getUser=asyncHandler(async(req,res,next)=>{
   
    const user=req.user
    
    res.status(200).json({
        success:true,
        user
    })
    
})