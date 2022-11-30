const express=require("express")

const {  getDetailProduct, getAllProduct, getHotProduct, getProductPromo } = require("../controllers/User/products.controller")
const { authenticate } = require("../middlewares/auth/authenticate")
const { authorize } = require("../middlewares/auth/authorize")
const { uploadImage } = require("../middlewares/upload/upload-image")
 
const productsRouter=express.Router()



productsRouter.get("/",getAllProduct)
productsRouter.get("/sale",getHotProduct)
productsRouter.get("/promo",getProductPromo)
productsRouter.get("/:id",getDetailProduct)




module.exports={
    productsRouter
}