import { json } from "express";

class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }

}


export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;

    if(err.name=== "CaseError"){
        const message=`Resource not found .  Invalid ${err.path}`
        err=new ErrorHandler(message,400)
    }
    if(err.code===11000){
        const message=`Duplicate ${object.keys(err.keyvalue)} Entered`;
        err=new ErrorHandler(message,400)
    }

    // Wrong JWT error
    if(err.name==="JsonWebTokenError"){
        const message=`Json web Token is invalid , try again`
        err=new ErrorHandler(message,400)
    }
     // JWT Expire Error
     if(err.name==="TokenExpiredError"){
        const message=`Json Web Token is Expire , Try again`;
        err=new ErrorHandler(message,400)
    }

    return res.status(err.statusCode).json({
        success:false,
        message:err.message

    })
}




export default ErrorHandler