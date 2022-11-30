
const { or } = require('sequelize')
const { Order, User, OrderDetail, sequelize, Product, Address } = require('../../models')
const orderdetail = require('../../models/orderdetail')

const cretaeOrders = async (req, res) => {

    const { status, total, products, address_id } = req.body
    console.log(status)
    const { user } = req
    console.log(user.id)

    try {

        const newOrders = await Order.create({ status, total, index_user: user.id, index_address: address_id })


        const productDetail = await products.forEach(async (item) => {
            const newOrdersDetail = await OrderDetail.create({ product_quantity: item.quantity, index_product: item.id, product_quantity: item.quantity, index_order: newOrders.id })

        })
        res.status(201).send({ status: 200, success: true, data: newOrders })
    } catch (error) {
        res.status(500).send(error)
    }

}
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
const getDetailOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const detailOrder = await Order.findOne({
            where: {
                id
            }
        })
        res.status(200).send(detailOrder)

    } catch (error) {
        res.status(500).send(error)

    }
}
const updateStatusOrder = async (req, res) => {
    const { id } = req.params
  const {status}=req.body
 
console.log(status)
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
const updateOrderSuccess = async (req, res) => {
    const { id } = req.params
    try {
        const detailOrder = await Order.findOne({
            where: {
                id
            }
        })
        if (detailOrder) {
            detailOrder.status_order = "Hoàn Thành"



        }



        await detailOrder.save()
        res.status(200).send(detailOrder)

    } catch (error) {
        res.status(500).send(error)


    }
}
const updateOrderCancel = async (req, res) => {
    const { id } = req.params
    try {
        const detailOrder = await Order.findOne({
            where: {
                id
            }
        })

        detailOrder.status_order = "Đã bị hủy"

        await detailOrder.save()
        res.status(200).send(detailOrder)

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
module.exports = {

    getOrder,
  
    updateStatusOrder,
    deleteOrder
}