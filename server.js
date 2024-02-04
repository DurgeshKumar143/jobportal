import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./database/index.js";
import {v2 as cloudinary} from 'cloudinary';

dotenv.config({
    path:'./config/.env'
})

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_API_SECRET 
  });



process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to Uncaught Exception`)
    process.exit(1)
})




connectDB().then(()=>{
    app.listen(process.env.PORT || 800,()=>{
        console.log(`Server is running port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log("MongoDb Connection Error ",error)
    process.exit()
})



// unhanled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`)    
    console.log(`Shuting down the server due to Unhandle Promise Rejection`)
    server.close(()=>{
        process.exit(1);
    })

})

