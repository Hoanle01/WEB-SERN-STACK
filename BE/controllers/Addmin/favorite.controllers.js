
const { Favorite, sequelize,Product } = require("../../models")

const createFavorite = async (req, res) => {

    const { index_product } = req.body


    const { user } = req
    // console.log(user)   
    try {

        // const existUser = await Favorite.findOne({
        //     where: {
        //         index_user: user.id
        //     }

        // })
         const existFavorite = await Favorite.findOne({
            where: {
                index_product:index_product,
                index_user:user.id
                
            }

        })

           console.log(existFavorite)




            if (existFavorite===null) {
             
                {const newFavorite = await Favorite.create({ index_product: index_product, index_user: user.id })
                res.status(201).send({ data: null, status: 200, success: true })

                console.log("san pham chua ton tai")}
                
            }
        //     else if( existFavorite.index_product===index_product)
        //    {
        //         if(existUser.index_user===user.id){
        //             const newFavorite = await Favorite.create({ index_product: index_product, index_user: user.id })
        //         res.status(201).send({ data: null, status: 200, success: true })

        //         console.log("san pham chua ton tai")
        //     }
                
        //     }
        //    else if (existUser.index_user === user.id || existFavorite.index_product!==index_product) {
        //         const newFavorite = await Favorite.create({ index_product: index_product, index_user: user.id })
        //         res.status(201).send({ data: null, status: 200, success: true })

        //         console.log("san pham chua ton tai")
        //     }  
        //     // else if (existUser.index_user !==user.id) {
        //     //     const newFavorite = await Favorite.create({ index_product: index_product, index_user: user.id })
        //     //     res.status(201).send({ data: null, status: 200, success: true })

        //     //     console.log("san pham chua ton tai")
        //     // }  
            else {
                res.status(500).send({ data: null, status: 500, success: false })

                console.log("san pham co ton tai")

         }

      






    } catch (error) {
        res.status(500).send(error.message)
    }

}
const getAllFavoriteUser=async (req,res)=>{

    const perPage = parseInt(req.query.perPage, 10);
  const {name} = req.query;
  const page = parseInt(req.query.page, 10) || 1;

  const {width} = req.query


  const skip = ((page - 1) * perPage);


    const {user}=req

    try {
        if (width) {
        const {count}=await Favorite.findAndCountAll({
            where:{
                index_user:user.id
            },
            offset: skip, limit: perPage       
        })
      let totalPage = Math.ceil(count / perPage)
const productList=await Favorite.findAll({
    include: [
        {
            model: Product,
            as: "product",

        }
    ], 
    where:{
        index_user:user.id
    },offset:skip,limit:perPage
})
      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



     res.status(200).send({ data: productList, pagination: productList.pagination })
    }
        // res.status(200).send(favoriteUserList)
    
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}
const getAllFavorite = async (req, res) => {

    try {

        const [results] = await sequelize.query(`
        select * from users
        inner join favorites on users.id=favorites.index_user
        inner join products on products.id=favorites.index_product `)
        res.status(200).send(results)

    } catch (error) {
        res.status(500).send(error.message)


    }
}
const getIsFavorite=async (req,res)=>{
    const { product_id } = req.body

    console.log(product_id)
    const {user}=req
    try {
        const detailFavorite= await Favorite.findOne({
            where:{
                index_product:product_id,
                index_user:user.id
            }
        })
        if(detailFavorite){
         res.status(200).send("yes")   
        }
        else
      {  
        res.status(200).send("nope")   }
        

    } catch (error) {
        res.status(500).send(error)
        
    }
}



// const updateCart=async(req,res)=>{
//    const {id}=req.params
//    const {total_price}=req.body
//    try {
//        const detailCart= await Cart.findOne({
//            where:{
//                id
//            }
//        })
//        detailCart.total_price=total_price
//        await detailCart.save()
//        res.status(200).send(detailCart)

//    } catch (error) {
//        res.status(500).send(error)


// }
// }
const deleteFavorite = async (req, res) => {
    const { id } = req.params
    try {
        await Favorite.destroy({
            where: {
                id
            }
        })
        res.status(201).send({ data: null, status: 200, success: true })

    } catch ({ error }) {
        res.status(500).send(error)

    }
}
module.exports = {
    createFavorite,
    getAllFavorite,
    getIsFavorite,
        getAllFavoriteUser,
    // updateCart,
    deleteFavorite,
}