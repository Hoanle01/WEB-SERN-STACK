const { User,Address,Visitor } = require("../../models")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");



const adminlogin = async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    //tìm ra user đăng nhập dưạ trên email
    const user = await User.findOne({
        where: {
            email,
            type:"ADMIN"
        }
    })
    console.log(user)
    if (user) {
       
       
        
        //kiểm tra mật khẩu có đúng hay không 
        const isAuth = bcrypt.compareSync(password, user.password)
  
        if (isAuth) {
            const token = jwt.sign({name:user.name, email: user.email, type: user.type ,id:user.id,birthday:user.birthday,numberPhone:user.numberPhone,gender:user.gender,index_address:user.index_address}, "hoang29", { expiresIn: 1800*60 })

            res.status(200).send({ message: "Đăng nhập thành công ",data:{ token ,id:user.id,name:user.name,birthday:user.birthday,numberPhone:user.numberPhone,gender:user.gender,index_address:user.index_address}})

        } else {
            res.status(401).send({ error:{code:401,message:"Invalid email or password"},status:401,success:false })

        }
    } else {
        res.status(404).send({ message: "không tìm thấy email phù hợp " })

    }


}
const dashShow=async(req,res)=>{
    const id_address = req.body 
 try {
      const {count}  = await Visitor.findAndCountAll({ 
        where:{
            id_address
        }
    })
console.log(count)

    if(count<1){
    const createIdAddress=await Visitor.create({
        id_address
    })
    
}
res.status(200).send({count:count})

 } catch (error) {
    res.send(error.message)
 }
  
}

module.exports={
    adminlogin,
    dashShow
}   