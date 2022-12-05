const express=require("express")
const { createFavorite, deleteFavorite, getAllFavorite, getIsFavorite, getAllFavoriteUser } = require("../controllers/User/favorite.controllers")
const { authenticate } = require("../middlewares/auth/authenticate")
const { checkExitsFavorite } = require("../middlewares/validation/checkExit")


const favoriteRouter=express.Router()
favoriteRouter.post("/",authenticate,createFavorite)
favoriteRouter.get("/",getAllFavorite)
favoriteRouter.get("/favoriteUser",authenticate,getAllFavoriteUser)
favoriteRouter.post("/is-favorite",authenticate,getIsFavorite)
favoriteRouter.delete("/:id",deleteFavorite)

module.exports={
    favoriteRouter
}