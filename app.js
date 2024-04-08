import  express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./router/userRouter.js"
import jobRouter from "./router/jobRouter.js"
import applicationRouter from "./router/applicationRouter.js"
import { errorMiddleware } from "./middleware/error.js";
const app=express()

dotenv.config({
    path:'./config/.env'
})


app.use(
    cors({
      origin: "https://dkjobfinder.netlify.app",
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );

  

  
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp"
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/jobs",jobRouter)
app.use("/api/v1/application",applicationRouter)

app.get("/",(req,res)=>{
    res.send("API is running");
    console.log("API is Live");
});






app.use(errorMiddleware)
export default app
