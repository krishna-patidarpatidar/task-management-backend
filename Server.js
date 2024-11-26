const express = require("express")
const bodyParser=require("body-parser")
require("dotenv").config()
const routes=require("./task-management-api/src/Routes")
require("./config/db")
const cors = require('cors')
const app=express()
const PORT=process.env.PORT || 7800
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
// parse application/json
app.use(bodyParser.json());
app.use("/",routes)
app.listen(PORT, ()=>{
    console.log(`server started on : ${PORT}`)
})
module.exports=app