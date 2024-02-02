import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./database/index.js";

dotenv.config({
    path:'./config/.env'
})


connectDB().then(()=>{
    app.listen(process.env.PORT || 800,()=>{
        console.log(`Server is running port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log("MongoDb Connection Error ",error)
    process.exit()
})


