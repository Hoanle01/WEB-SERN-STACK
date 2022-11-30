const express=require("express")
const { createBanner, getAllBanner } = require("../controllers/Addmin/banners.controllers")
const { uploadImage } = require("../middlewares/upload/upload-image")
const bannerRouter=express.Router()

bannerRouter.post("/",uploadImage("banner"),createBanner)
bannerRouter.get("/",getAllBanner)
module.exports={
    bannerRouter
}