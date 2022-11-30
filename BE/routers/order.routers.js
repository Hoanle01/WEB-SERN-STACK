const express=require("express")
const { cretaeOrders, getOrder, getDetailOrder, updateOrderAssignment, deleteOrder } = require("../controllers/User/order.controllers")

const { authenticate } = require("../middlewares/auth/authenticate")

const orderRouter=express.Router()


orderRouter.post("/",authenticate,cretaeOrders)
orderRouter.get("/",authenticate,getOrder)
orderRouter.get("/:id",getDetailOrder)
orderRouter.put("/:id",updateOrderAssignment)
orderRouter.delete("/:id",deleteOrder)

module.exports={
    orderRouter
}