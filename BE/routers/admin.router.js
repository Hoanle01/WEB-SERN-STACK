const express=require("express")
const {  adminlogin} = require("../controllers/Addmin/admin.controllers")
const { getOrder, updateStatusOrder,  totalOrder, countOrder, OrderMonth } = require("../controllers/Addmin/orders.admin.controller")
const { getAllProduct, createProduct, deleteProduct, updateProduct, countProduct, productHasBuy } = require("../controllers/Addmin/product.admin")
const { manageOrderShiper } = require("../controllers/Addmin/shiper.admin.controller")
const { getAllUser, deleteUser, updateType } = require("../controllers/Addmin/user.admin.controller")
const { authenticate } = require("../middlewares/auth/authenticate")
const { authorize } = require("../middlewares/auth/authorize")
const { uploadImage } = require("../middlewares/upload/upload-image")

const adminRouter=express.Router()
adminRouter.post("/admin-login",adminlogin)
adminRouter.get("/product-list",getAllProduct)
adminRouter.get("/users",getAllUser)
adminRouter.delete("/user/:id",deleteUser)
adminRouter.get("/orders",getOrder)
adminRouter.get("/manager-shiper",manageOrderShiper)
adminRouter.post("/products",uploadImage("products"),createProduct)
adminRouter.delete("/products/:id",deleteProduct)
adminRouter.patch("/orders/:id" ,updateStatusOrder)
adminRouter.get("/report" ,totalOrder)
adminRouter.get("/countOrder" ,countOrder)
adminRouter.get("/ordermonth" ,OrderMonth)
adminRouter.get("/producthasbuy" ,productHasBuy)

adminRouter.get("/countproduct" ,countProduct)
adminRouter.post("/products/:id",uploadImage("products"),updateProduct)
adminRouter.put("/update-type",updateType)


module.exports={
    adminRouter
}