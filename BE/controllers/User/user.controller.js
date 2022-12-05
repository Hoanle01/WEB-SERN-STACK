
const { User,Address } = require("../../models")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");





const register = async (req, res) => {
    const { name, email, password, numberPhone} = req.body
    try {
        //tạo avatar mặc định
      


        //taọ ra 1 chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(10)

        //mã hóa salt+password
        const hashPassword = bcrypt.hashSync(password, salt)
        const newUsers = await User.create({
            name, email, password: hashPassword, numberPhone
        })
        res.status(201).send(newUsers)
    } catch (error) {

        res.status(500).send(error)
        console.log(error)
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    //tìm ra user đăng nhập dưạ trên email
    const user = await User.findOne({
        where: {
            email
        }
    })
    
    if (user) {
       
       
        
        //kiểm tra mật khẩu có đúng hay không 
        const isAuth = bcrypt.compareSync(password, user.password)
  
        if (isAuth) {
            const token = jwt.sign({name:user.name, email: user.email, type: user.type ,id:user.id,birthday:user.birthday,numberPhone:user.numberPhone,gender:user.gender,index_address:user.index_address}, "hoang29", { expiresIn: 1800*60 })

            res.status(200).send({ message: "Đăng nhập thành công ", token ,id:user.id,name:user.name,birthday:user.birthday,numberPhone:user.numberPhone,gender:user.gender,index_address:user.index_address})

        } else {
            res.status(401).send({ error:{code:401,message:"Invalid email or password"},status:401,success:false })

        }
    } else {
        res.status(404).send({ message: "không tìm thấy email phù hợp " })

    }


}
const getProfile=async(req,res)=>{
   const {width}=req.query
const {user}=req
try {
    if(width){
        
       {
        const detailInfor = await User.findOne({
            where: {
              id:user.id
            },
              include: [
                {
                  model: Address,
                  as: "address"
                },
                
              ]
            
          })
          res.status(200).send({data:detailInfor,status:200,success:true})
       }
}else{
    const userlist=await User.findOne({
        where:{
            id:user.id
        },
        // include:[
        //     {
        //         module:Address,
        //         as:"address"
        //     }
        // ]
        
    })
    console.log(userlist)

    res.status(200).send({data:{id:userlist.id,birthday:userlist.birthday,gender:userlist.gender,numberPhone:userlist.numberPhone,email:userlist.email,name:userlist.name},status:200,success:true})



    }
    // const userlist=await User.findOne({
    //     where:{
    //         id:user.id
    //     }
    // })
    // res.status(200).send({data:{id:user.id,birthday:user.birthday,gender:user.gender,phone:user.numberPhone,email:user.email,name:user.name,index_address:user.index_address },status:200,success:true})
} catch (error) {
    res.status(500).send(error.message)
}
}
const changeProfile = async (req, res) => {
    const {user}=req
    const {name,email,numberPhone,gender,birthday}=req.body
    console.log(numberPhone)
    try {
        const UserFind = await User.findOne({
            where: {
              id:user.id
            }})
        if(UserFind){
            const updateChange=await User.update({
            name,email,numberPhone,gender,birthday
            },{where:
               { id:user.id}
            })
          res.status(200).send({data:{id:user.id,birthday:user.birthday,gender:user.gender,numberPhone:user.numberPhone,email:user.email,name:user.name},status:200,success:true})
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
  }
// const changeAddress=async (res,req)=>{
//     //  const {user}=req
//     const { email, password } = req.body

//    console.log(email)
//      //     try {
                 
                  
//      //                 const newFavorite = await Address.create({district,street_name,province,ward})
//      //                 res.status(201).send({ data: null, status: 200, success: true })
     
//      //     } catch (error) {
//      //         res.status(500).send(error.message)
//      //     }
//     // try {
//     //     const UserFind = await User.findOne({
//     //         where: {
//     //           id:user.id
//     //         }}) 
    
       
//     //     if(UserFind.index_address===null){
         
//     //         const newFavorite = await Address.create({district,street_name,province,ward})
//     //         res.status(201).send({ data: null, status: 200, success: true })  
//     //     }
       
//     //      }catch(error){

//     //     }
//     // createAddress
// }
const changeAddress = async (req, res) => {
    const {user}=req
    const { district,street_name,province,ward } = req.body
  
      try {
        const UserFind = await User.findOne({
            where: {
              id:user.id
            }}) 
    
       
        if(UserFind.index_address===null){
        
            const newAddress = await Address.create({district,street_name,province,ward})
            
            const updateChange=await User.update({
                index_address:newAddress.id
                },{where:
                   { id:user.id}
                })
                res.status(200).send({data:newAddress,status:200,success:true})
        }
        else if(UserFind.index_address!==null){
            const newAddress=await Address.update({
                district,street_name,province,ward
            },{where:{
                id:UserFind.index_address
            }} )
            res.status(200).send({data:{district,street_name,province,ward},status:200,success:true})

        }
       else{
        res.status(500).send("khgJ")
       }
         }catch(error){

        }
  }


module.exports = {
    register,
    login,
    changeProfile,
    getProfile,
    changeAddress
   
}