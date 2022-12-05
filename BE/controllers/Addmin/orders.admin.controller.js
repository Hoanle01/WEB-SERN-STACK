
const { or } = require('sequelize')
const { Order, User, OrderDetail, sequelize, Product, Address } = require('../../models')
const orderdetail = require('../../models/orderdetail')


const getOrder = async (req, res) => {
    //láy sau giấu ?
    const { user } = req
    const perPage = parseInt(req.query.perPage, 10);
    const {name} = req.query;
    const page = parseInt(req.query.page, 10) || 1;
  
    const {width} = req.query
    const skip = ((page - 1) * perPage);
  

    try {

       


        const userOrder = await Order.findAll({

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
        // res.send(userOrder)

        if (userOrder !== null) {
            // const orderdetail1=await Order.findOne({
            //     where
            // }) 

            const r = userOrder.map((item) => (item.id))

            const l=userOrder.map((item)=>(item.index_address))

            const t = await User.findAll()


            
            // console.log(userOrder)

            const data = []
          
           
                      
            for (let i = 0; i < r.length; i++) {

                //    const address = await Address.findAll({

                
                //     where: {
                //         id: user.index_address,

                //     }
                // })
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
                

               
              
            

            //  userOrder1.push({address:address})
                userOrder1.push({order_detail:product1})
                // order_details=product1
            
                // product1.push(userOrder1)
            






                 data.unshift({userOrder:userOrder1})
                // address.concat(order_details)
                // data.push(address)
              
                
                //   res.send({data:userOrder1,orderdetail})

            }
       
             res.send({data:data,status:200,success:true})
       
           }
        


    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateStatusOrder = async (req, res) => {
    const { id } = req.params
  const {status}=req.body
 

        try {
            const detailOrder = await Order.findOne({
                where: {
                    id
                }
            })

            detailOrder.status = status

            await detailOrder.save()
            res.status(200).send({status:200,success:true})

        } catch (error) {
            res.status(500).send(error)


        }


     

}




const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        await Order.destroy({
            where: {
                id
            }
        })
        res.status(200).send("xóa thành công")
    } catch ({ error }) {
        res.status(500).send(error)

    }
}
const totalOrder=async(req,res)=>{

    try {

        const [results] = await sequelize.query(`
        SELECT sum(total) as total FROM orders `)
       
        res.status(200).send(results)

    } catch (error) {
        res.status(500).send(error.message)


    }
}
const countOrder=async(req,res)=>{

    try {

        const [results] = await sequelize.query(`
        SELECT count(id) as count FROM orders `)
       
        res.status(200).send(results)

    } catch (error) {
        res.status(500).send(error.message)


    }
}
const OrderMonth=async(req,res)=>{

    try {

        const [results] = await sequelize.query(`
        SELECT date_format(createdAt,"%m/%Y") as date,sum(total)as total FROM orders
        group by month(createdAt) `)
       
        res.status(200).send(results)

    } catch (error) {
        res.status(500).send(error.message)


    }
}
module.exports = {

    getOrder,
  countOrder,
    updateStatusOrder,
    deleteOrder,
    totalOrder,
    OrderMonth
}