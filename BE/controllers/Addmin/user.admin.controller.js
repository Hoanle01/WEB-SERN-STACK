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
            type:"CLIENT"
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
module.exports={
    getAllUser,
    deleteUser
}