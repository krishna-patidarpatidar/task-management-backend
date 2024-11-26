const authenticateToken = require("../AuthHelper")
const UserController=require("./UserController")
const Router=require("express").Router()

Router.post("/register",UserController.RegisterUser)
Router.post("/login",UserController.LoginUser)
Router.get("/profile",authenticateToken,UserController.GetProfile)
Router.get("/get-all-user",authenticateToken,UserController.GetUsers)

module.exports=Router