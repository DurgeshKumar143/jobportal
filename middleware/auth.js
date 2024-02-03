import  {User} from "../model/userModel.js";
import asyncHandler  from "../utils/asyncHandler.js";
import ErrorHandler from "./error.js"

import  jwt  from "jsonwebtoken";


export const isAuthorized=asyncHandler(async(req,res,next)=>{
    const {token}=req.cookies
     
    if(!token){
        return next(new ErrorHandler("User is not authorized",400))
    }

    const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    req.user=await User.findById(decode._id)
     
    next();

})