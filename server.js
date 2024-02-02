import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./database/index.js";



process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to Uncaught Exception`)
    process.exit(1)
})

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



// unhanled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`)    
    console.log(`Shuting down the server due to Unhandle Promise Rejection`)
    server.close(()=>{
        process.exit(1);
    })

})

