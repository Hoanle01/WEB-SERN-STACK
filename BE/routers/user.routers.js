const express=require("express")
const {  register, login , getProfile, changeProfile, changeAddress} = require("../controllers/User/user.controller")
const { authenticate } = require("../middlewares/auth/authenticate")
const { uploadImage } = require("../middlewares/upload/upload-image")
const { checkExitsEmail } = require("../middlewares/validation/checkExit")


const userRouter=express.Router()

userRouter.post("/register",checkExitsEmail,register)
userRouter.post("/login",login)
userRouter.get("/user-profile",authenticate,getProfile)
userRouter.patch("/change-profile",authenticate,changeProfile)
userRouter.patch("/change-address",authenticate,changeAddress)


module.exports={
    userRouter
}
