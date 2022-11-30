
const { Op } = require('sequelize')
const {Categories}=require('../../models')

const cretaeCategories=async(req,res)=>{
    
     const {name}=req.body
     try { 
        const newCategories= await Categories.create({name})
    res.status(201).send(newCategories)

        
     } catch (error) {
        res.status(500).send(error)
     }
   
}
const getAllCategories=async(req,res)=>{
    //láy sau giấu ?
    const {name}=req.query
    try {
        if(name){
            const categoryList=await Categories.findAll({
                where:{
                    name:{
                        [Op.like]:`%${name}%`
                    }
                }
            })
        res.status(200).send(categoryList)


        }
        else{
             const categoryList=await Categories.findAll()
        res.status(200).send(categoryList)
        }
       
    } catch (error) {
        res.status(500).send(error)
    }
}
const getDetailCategories=async (req,res)=>{
    const {id}=req.params;
    try {
        const detailCategories= await Categories.findOne({
            where:{
                id
            }
        })
        res.status(200).send(detailCategories)

    } catch (error) {
        res.status(500).send(error)
        
    }
}
const updateCategories=async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    try {
        const detailCategories= await Categories.findOne({
            where:{
                id
            }
        })
        detailCategories.name=name
        await detailCategories.save()
        res.status(200).send(detailCategories)

    } catch (error) {
        res.status(500).send(error)
        
    
}
}
const deleteCategories=async (req,res)=>{
    const {id}=req.params
    try {
        await Categories.destroy({
            where:{
                id
            }
        })
        res.status(200).send("xóa thành công")
    } catch ({error}) {
        res.status(500).send(error)
        
    }
}
module.exports={
    cretaeCategories,
    getAllCategories,
    getDetailCategories,
    updateCategories,
    deleteCategories
}