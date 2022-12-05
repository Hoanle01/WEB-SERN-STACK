const express=require("express")
const { cretaeOrders, getOrder, getDetailOrder, updateOrderAssignment, deleteOrder } = require("../controllers/User/order.controllers")

const { authenticate } = require("../middlewares/auth/authenticate")
const { authorize } = require("../middlewares/auth/authorize")

const orderRouter=express.Router()


orderRouter.post("/",authenticate,authorize(["CLIENT","ADMIN"]),cretaeOrders)
orderRouter.get("/",authenticate,getOrder)
orderRouter.get("/:id",getDetailOrder)
orderRouter.put("/:id",updateOrderAssignment)
orderRouter.delete("/:id",deleteOrder)

module.exports={
    orderRouter
}