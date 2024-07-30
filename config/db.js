import mongoose from "mongoose";

export async function db(){
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }
    catch(err){
        console.log(err);
    }
}