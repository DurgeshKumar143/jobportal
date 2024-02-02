 import mongoose from "mongoose";
 

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
        console.log(`\n MongoDB Connected ! ! DB HOST: ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log(`\n MONGODB CONNECTION FAILED`,error)
        process.exit()
        
    }

}

export default connectDB