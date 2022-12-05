const express=require('express');
const favorite = require('../models/favorite');
const { addressRouter } = require('./address.router');
const { adminRouter } = require('./admin.router');
const { bannerRouter } = require('./Banner.router');

const { categoriesRouter } = require('./categories.routers');
const { favoriteRouter } = require('./favorite.routers');

const { orderRouter } = require('./order.routers');
const { productsRouter } = require('./product.routers');
const { shiperRouter } = require('./shiper.router');
// const { productionRouter } = require('./production.routers');
const { userRouter } = require('./user.routers');


const rootRouter=express.Router();
rootRouter.use('/category',categoriesRouter)
rootRouter.use('/user',userRouter)
rootRouter.use('/admin',adminRouter)
rootRouter.use('/product',productsRouter)
// rootRouter.use('/production',productionRouter)
// rootRouter.use('/address',addressRouter)


rootRouter.use('/favorite',favoriteRouter)
rootRouter.use('/order',orderRouter)
rootRouter.use('/banners',bannerRouter)
rootRouter.use('/shiper',shiperRouter)


module.exports={
    rootRouter
}