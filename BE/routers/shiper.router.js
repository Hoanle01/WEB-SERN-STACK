const express=require('express')
const { getOrderShiper, shiperlogin, createShiper, getMyOrderShiper, updateOrder, updateStatusShiper, historyDelivered } = require('../controllers/Shipper/order.shipper.controllers')
const { authenticate } = require('../middlewares/auth/authenticate')


const shiperRouter=express.Router()
shiperRouter.get("/orders",authenticate,getOrderShiper)
shiperRouter.get("/history-shiper",authenticate,historyDelivered)
shiperRouter.put("/status-shiper/:id",updateStatusShiper)
shiperRouter.put("/delete/:id",authenticate,updateOrder)
shiperRouter.get("/my-order",authenticate,getMyOrderShiper)
shiperRouter.post("/login",shiperlogin)
shiperRouter.post("/:id",authenticate,createShiper)

module.exports={    
    shiperRouter
}