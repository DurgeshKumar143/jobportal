import  express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./router/userRouter.js"
import jobRouter from "./router/jobRouter.js"
import applicationRouter from "./router/applicationRouter.js"
import { errorMiddleware } from "./middleware/error.js";
const app=express()

app.use(cors({
    origin:process.env.origin,
    credentials:true
}))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp"
}))


app.use("/api/v1/user",userRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)





app.use(errorMiddleware)
export default app