const { Op } = require("sequelize")
const { Product, Categories, Production, sequelize } = require("../../models")


const createProduct = async (req, res) => {

  const { name, price, description, discount, feature, index_categories, index_production, intendedFor,content} = req.body
  console.log(content)

  

  const { file } = req


  const urlImage = `http://localhost:3000/${file.path}`


  try {
     const newProduct = await Product.create({ name, price, content,image: urlImage, description, index_categories, feature, index_production, discount})
   console.log(newProduct)
  res.status(201).send({success:true,status:200})
  } catch (error) {
  res.status(500).send(error.message)
    
  }
 
}
const getAllProduct = async (req, res) => {



    const perPage = parseInt(req.query.perPage, 5)||2;
    const {width} = req.query;
    console.log(width)
    const page = parseInt(req.query.page, 10) || 1;
  
    
  
  
    const skip = ((page - 1) * perPage);
  
    try {
      if (width) {
       
        // const { count } = await Product.findAndCountAll({ offset: skip, limit: perPage })
        // let totalPage = Math.ceil(count / perPage)
        // console.log("123",count)
        const productList = await Product.findAll({

          include: [
            {
                model: Categories,
                as: "category",
    
            }
        ], 

          //  offset: skip, limit: perPage
          
          })
        // if (page <= totalPage) {
        //   if (page === 1) {
        //     productList.pagination = {
        //       current: page,
        //       perPage: perPage,
  
        //       total: count,
        //       totalPage: totalPage,
        //       link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
        //     }
        //   } else if (page === totalPage) {
        //     productList.pagination = {
        //       current: page,
        //       perPage: perPage,
  
        //       total: count,
        //       totalPage: totalPage,
        //       link: {
  
        //         previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
        //       }
        //     }
        //   } else {
        //     productList.pagination = {
        //       current: page,
        //       perPage: perPage,
  
        //       total: count,
        //       totalPage: totalPage,
        //       link: {
        //         link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
        //         previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
        //       }
        //     }
        //   }
        // } else productList.pagination = {
        //   err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
        // }
  
  
  
       res.status(200).send({ data: productList,status:200,success:true})
       }
     
      
    } catch (error) {
      res.status(500).send(error.message)
  
    }
  
  
  }
  const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, price, description, discount, feature, index_categories, index_production,intendedFor } = req.body



    const { file } = req
    const urlImage = `http://localhost:3000/${file.path}`
    

  console.log(file)
    try {
      const detailProduct = await Product.findOne({
        where: {
          id
        }
  
      })
      detailProduct.name = name
      detailProduct.price = price
      detailProduct.image = urlImage
      detailProduct.description = description
      detailProduct.discount = discount
      detailProduct.feature = feature
      detailProduct.intendedFor = intendedFor
      detailProduct.index_categories = index_categories
      detailProduct.index_production = index_production
      await detailProduct.save()
      res.status(200).send({status:200,success:true})
    } catch (error) {
      res.status(500).send(error)
  
    }
  
  }
  const deleteProduct = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
      await Product.destroy({
        where: {
          id
        }
      })
      res.status(200).send({status:200,success:true})
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  const countProduct=async(req,res)=>{
    try {

      const [results] = await sequelize.query(`
      SELECT count(id) as count FROM products `)
     
      res.status(200).send(results)

  } catch (error) {
      res.status(500).send(error.message)


  }
  }
  const productHasBuy=async(req,res)=>{
    try {

      const [results] = await sequelize.query(`
      SELECT categories.name,round(((sum(orderdetails.product_quantity*products.price))/(   SELECT  (sum(orderdetails.product_quantity*products.price)) as total FROM orderdetails
inner join products on products.id=orderdetails.index_product))*100,2)  as 
percent FROM orderdetails
inner join products on products.id=orderdetails.index_product
inner join categories on categories.id=products.index_categories
group by categories.name`)
   
  res.status(200).send(results)
  } catch (error) {
      res.status(500).send(error.message)


  }
  }
  module.exports={
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    countProduct,
    productHasBuy
  }