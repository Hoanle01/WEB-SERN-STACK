const { Op } = require("sequelize")
const {User,Favorite} = require("../../models")

const checkExits=(Model)=>{
return async(req,res,next)=>{
    const {id}=req.params
    const category=await Model.findOne({
        where:{
            id
        }
    })
    if(category){
        console.log(category)
        next()
    }else{
        res.status(404).send(`không tìm thấy category có id :${id} `)
    }
}}
const checkExitsEmail=async(req,res,next)=>{
   
        const {email}=req.body
        const existUser=await User.findOne({
            where:{
                email:email
            }
        })
       
        if(existUser){
            
            res.status(500).send({message:"email đã được sử dụng vui lòng đăng nhập lại"})
        }else{
           next()
        }
    
   
    }
    const checkExitsFavorite=async (req,res,next)=>{
   
        const { index_product } = req.body
console.log(index_product)
        try {
            
      
        const existFavorite=await Favorite.findAll({
            where:{
                index_product:index_product
            }
        })

       
        if(existFavorite!=null){
            console.log("123ed")
            res.status(500).send({ data: null, status: 500, success: false })

        }
      
           next()
       
      } catch (error) {
            
        }
   
    }
    
module.exports={
    checkExits,
     checkExitsEmail,
     checkExitsFavorite
}