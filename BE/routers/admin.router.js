const express=require("express")
const {  adminlogin, dashShow } = require("../controllers/Addmin/admin.controllers")
const { getOrder, updateStatusOrder } = require("../controllers/Addmin/orders.admin.controller")
const { getAllProduct, createProduct, deleteProduct, updateProduct } = require("../controllers/Addmin/product.admin")
const { getAllUser, deleteUser } = require("../controllers/Addmin/user.admin.controller")
const { authenticate } = require("../middlewares/auth/authenticate")
const { authorize } = require("../middlewares/auth/authorize")
const { uploadImage } = require("../middlewares/upload/upload-image")

const adminRouter=express.Router()
adminRouter.post("/admin-login",adminlogin)
adminRouter.get("/product-list",getAllProduct)
adminRouter.get("/users",getAllUser)
adminRouter.delete("/user/:id",deleteUser)
adminRouter.get("/orders",getOrder)
adminRouter.post("/products",uploadImage("products"),createProduct)
adminRouter.delete("/products/:id",deleteProduct)
adminRouter.patch("/orders/:id" ,updateStatusOrder)
adminRouter.get("/dashShow" ,dashShow)
adminRouter.post("/products/:id",uploadImage("products"),updateProduct)


module.exports={
    adminRouter
}