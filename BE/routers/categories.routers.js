const express=require("express")
const { cretaeCategories,getAllCategories, getDetailCategories, updateCategories, deleteCategories } = require("../controllers/Addmin/categories.controllers")
const { authenticate } = require("../middlewares/auth/authenticate")
const { authorize } = require("../middlewares/auth/authorize")
const { checkExits } = require("../middlewares/validation/checkExit")
const {Categories} = require("../models")

const categoriesRouter=express.Router()


categoriesRouter.post("/",cretaeCategories)
categoriesRouter.get("/", getAllCategories)
categoriesRouter.get("/:id", getDetailCategories),
categoriesRouter.put("/:id",checkExits(Categories), updateCategories),
categoriesRouter.delete("/:id",checkExits(Categories),deleteCategories),



module.exports={
    categoriesRouter
}