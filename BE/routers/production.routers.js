const express=require("express")
const { createProduction, getAllProduction, updateProduction, deleteProduction } = require("../controllers/Addmin/production.controllers")
const productionRouter=express.Router()


productionRouter.post("/",createProduction)
productionRouter.get("/",getAllProduction)
productionRouter.put("/:id",updateProduction)
productionRouter.delete("/:id",deleteProduction)
module.exports={
    productionRouter
}