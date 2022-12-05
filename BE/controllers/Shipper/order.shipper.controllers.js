const { Order, User, OrderDetail, sequelize, Product, Address } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const { where, Op } = require('sequelize');
const createShiper=async(req,res)=>{
    const {id}=req.params
    const {user}=req 

    try {
        const existOrder = await Order.findOne({
            where: {
                id,
                
                
                
            }

        })
        if (existOrder!==null) {
             
            const newFavorite = await Order.update({index_shipper:user.id,status:6 },{where:{id:existOrder.id}})
            res.status(201).send({ data: null, status: 200, success: true })

            console.log("san pham chua ton tai")
            
        }
    
        else {
            res.status(500).send({ data: null, status: 500, success: false })

            console.log("san pham co ton tai")

     }

  







    } catch (error) {
         res.status(500).send(error.message)
    }

}
const updateOrder=async(req,res)=>{
    const { id } = req.params
   
   
  
          try {
              const detailOrder = await Order.findOne({
                  where: {
                      id
                  }
              })
  
              detailOrder.status = 9
  
              await detailOrder.save()
              res.status(200).send({status:200,success:true})
  
          } catch (error) {
              res.status(500).send(error)
  
  
          }
  
}
const getOrderShiper=async(req,res)=>{
    const {user}=req

    console.log(user.id)
    const userOrder = await Order.findAll({
        where:{
            status:9,
            index_shipper:
            {
                [Op.not]:user.id
            }
        },
        include: [
            {
                model: Address,
                as: "address1",

            },
            {
                model:User,
                as:"user"
            }

        ],
    }) 
   

    const shipOrder = await Order.findAll({
        where:{
            status:4,
           index_shipper:null
        },
        include: [
            {
                model: Address,
                as: "address1",

            },
            {
                model:User,
                as:"user"
            }

        ],
    })
   console.log('mar',shipOrder)
    if (userOrder !== null&&shipOrder!==null) {
        const r = userOrder.map((item) => (item.id))
        const t = shipOrder.map((item) => (item.id))

 const c=r.concat(t)

        const data = []
      
       
                  
        for (let i = 0; i < c.length; i++) {

         
            const userOrder1 = await Order.findAll({
                include: [
                    {
                        model: Address,
                        as: "address1",
    
                    },
                    {
                        model:User,
                        as:"user"
                    }
    
                ],
                where: {
                    id: c[i],

                }
            })
            console.log(userOrder1)
            const product1 = await OrderDetail.findAll({
                include: [
                    {
                        model: Product,
                        as: "product1",

                    },

                ],
                where: {

                    index_order: c[i]


                }
            })
            userOrder1.push({order_detail:product1})
             data.unshift({userOrder:userOrder1})

        }
   
         res.send({data:data,status:200,success:true})
   
       }
        else if(shipOrder!==null &&userOrder===null){
        const r = shipOrder.map((item) => (item.id))

        
        const data = []
      
       
                  
        for (let i = 0; i < r.length; i++) {

         
            const userOrder1 = await Order.findAll({
                include: [
                    {
                        model: Address,
                        as: "address1",
    
                    },
                    {
                        model:User,
                        as:"user"
                    }
    
                ],
                where: {
                    id: r[i],

                }
            })
            console.log(userOrder1)
            const product1 = await OrderDetail.findAll({
                include: [
                    {
                        model: Product,
                        as: "product1",

                    },

                ],
                where: {

                    index_order: r[i]


                }
            })
            userOrder1.push({order_detail:product1})
             data.unshift({userOrder:userOrder1})

        }
   
         res.send({data:data,status:200,success:true})
       }
    

}
const getMyOrderShiper=async(req,res)=>{
    const {user}=req
    
    const userOrder = await Order.findAll({
        where:{
            status:{
                [Op.not]: 9,
                [Op.not] :8   
            },
           index_shipper:user.id
        },
        include: [
            {
                model: Address,
                as: "address1",

            },
            {
                model:User,
                as:"user"
            }

        ],
    })
    
    if (userOrder !== null) {
        const r = userOrder.map((item) => (item.id))
        
    
        const data = []
      
       
                  
        for (let i = 0; i < r.length; i++) {

         
            const userOrder1 = await Order.findAll({
                include: [
                    {
                        model: Address,
                        as: "address1",
    
                    },
                    {
                        model:User,
                        as:"user"
                    }
    
                ],
                where: {
                    id: r[i],

                }
            })
            console.log(userOrder1)
            const product1 = await OrderDetail.findAll({
                include: [
                    {
                        model: Product,
                        as: "product1",

                    },

                ],
                where: {

                    index_order: r[i]


                }
            })
            userOrder1.push({order_detail:product1})
             data.unshift({userOrder:userOrder1})

        }
   
         res.send({data:data,status:200,success:true})
   
       }
    

}
const shiperlogin = async (req, res) => {
    const { email, password } = req.body

    //tìm ra user đăng nhập dưạ trên email
    const user = await User.findOne({
        where: {
            email,
            type:"SHIPER"
        }
    })
  
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
const updateStatusShiper=async(req,res)=>{
    const { id } = req.params
    const {status}=req.body
    const {updateddAt}=req.body
    console.log(updateddAt)
   
   
  
    try {
        const detailOrder = await Order.findOne({
            where: {
                id
            }
        })

        detailOrder.status = status
        detailOrder.updatedAt = updateddAt

        await detailOrder.save()
        res.status(200).send({status:200,success:true})

    } catch (error) {
        res.status(500).send(error)


    }

}
const historyDelivered=async(req,res)=>{
    const {user}=req

            const userOrder=await Order.findAll(
        {
            where:{
            status:8,
            index_shipper:user.id
        },
        include: [
            {
                model: Address,
                as: "address1",

            },
            {
                model:User,
                as:"user"
            }

        ],
    })
    
       
    if (userOrder !== null) {
        const r = userOrder.map((item) => (item.id))
        
    
        const data = []
      
       
                  
        for (let i = 0; i < r.length; i++) {

         
            const userOrder1 = await Order.findAll({
                include: [
                    {
                        model: Address,
                        as: "address1",
    
                    },
                    {
                        model:User,
                        as:"user"
                    }
    
                ],
                where: {
                    id: r[i],

                }
            })
            console.log(userOrder1)
            const product1 = await OrderDetail.findAll({
                include: [
                    {
                        model: Product,
                        as: "product1",

                    },

                ],
                where: {

                    index_order: r[i]


                }
            })
            userOrder1.push({order_detail:product1})
             data.unshift({userOrder:userOrder1})

        }
   
         res.send({data:data,status:200,success:true})
   
       }
    

}


module.exports={
    updateOrder,
    getOrderShiper,
    getMyOrderShiper,
    shiperlogin,
    createShiper,
    updateStatusShiper,
    historyDelivered
}