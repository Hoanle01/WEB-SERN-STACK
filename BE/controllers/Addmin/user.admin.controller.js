const { Op } = require("sequelize")
const {User,Address}=require("../../models")


const getAllUser=async (req,res)=>{
    const userList=await User.findAll({
        include:[
            {
            model:Address,
            as:"address"
        }
    ],
        where:{
            type:{
                [Op.not]:"ADMIN"
            }
        }
    })
    res.status(200).send({data:userList,status:200,success:true})
}
const deleteUser=async(req,res)=>{
    const {id}=req.params
    try {
        await User.destroy({
            where:{
                id
            }
        })
      res.status(200).send({status:200,success:true})

    } catch (error) {
      res.status(500).send(error.message)
        
    }
}
const updateType=async(req,res)=>{
    const {role}=req.body
    const {id}=req.params
    try {
        const updateType=await User.update({type:role},{where:{
            id
    }})
        res.status(200).send({success:true,status:200})
    } catch (error) {
        
    }
}
module.exports={
    getAllUser,
    deleteUser,
    updateType
}