require("dotenv").config()
const mongoose=require("mongoose")
const DB_URL=process.env.MONGO_URL
 mongoose.connect(DB_URL).then(()=>{
        console.log("database conected")
    }
 ).catch((err)=>{
    console.log(err)
 })