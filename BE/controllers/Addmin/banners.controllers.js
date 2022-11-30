const {Banner}=require("../../models")

const createBanner=async(req,res)=>{
    const {name,status}=req.body
    const { file } = req
    console.log(file)
    const urlImage = `http://localhost:3000/${file.path}`
    try {
        const newBanner=await Banner.create({name,status,image:urlImage})
    res.status(201).send(newBanner)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
}
const getAllBanner=async(req,res)=>{
    const bannerList=await Banner.findAll()
    res.status(200).send(bannerList)
}
module.exports={
    createBanner,
    getAllBanner

}