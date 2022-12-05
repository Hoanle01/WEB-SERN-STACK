
const { or } = require('sequelize')
const { Order, User, OrderDetail, sequelize, Product, Address } = require('../../models')
const orderdetail = require('../../models/orderdetail')

const cretaeOrders = async (req, res) => {

    const { status, total, products, address_id } = req.body

    const { user } = req
   

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

        // if(width){

        //     const {count}=await Order.findAndCountAll({
        //         where:{
        //             index_user:user.id
        //         },
        //         offset: skip, limit: perPage       
        //     })
        //     console.log(count)
        //   let totalPage = Math.ceil(count / perPage)
        //   console.log(totalPage)
        // }


        const userOrder = await Order.findAll({

            include: [
                {
                    model: Address,
                    as: "address1",

                },

            ],



            where: {
                index_user: user.id
            }
        })

        // res.send(userOrder)

        if (userOrder !== null) {
            // const orderdetail1=await Order.findOne({
            //     where
            // }) 

            const r = userOrder.map((item) => (item.id))

            // console.log(userOrder)

            const data = []
          
           
                      
            for (let i = 0; i < r.length; i++) {

                   const address = await Address.findAll({

                    
                    where: {
                        id: user.index_address,

                    }
                })
                const userOrder1 = await Order.findAll({
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
                

               
              
            

             userOrder1.push({address:address})
                userOrder1.push({order_detail:product1})
                // order_details=product1
            
                // product1.push(userOrder1)
            






                 data.unshift({userOrder:userOrder1})
                // address.concat(order_details)
                // data.push(address)
              
                
                //   res.send({data:userOrder1,orderdetail})

            }
       
             res.send({data:data})
       
            // res.send({orderdetail:orderdetail})

            // {
            //     console.log('nkk',item.id)


            //     const OrderDetail1=await OrderDetail.findAll({
            //     include: [
            //         {
            //             model: Product,
            //             as: "product1",

            //         }
            //     ],      
            //     where:{

            //     index_order:item.id


            //     }


            // //     })

            // })
            // res.send(OrderDetail1)

            //  })

        }
        //  const productDetakd = await productDetail.forEach(async (item) => {

        //     const OrderDetail1=await OrderDetail.findAll({
        //             // include: [
        //             //     {
        //             //         model: Product,
        //             //         as: "product1",

        //             //     }
        //             // ],      
        //             where:{
        //                 index_order:item

        //             }

        //     //     })
        //          console.log(item)
        // })
        //  console.log(userOrder)
        //  const OrderDetail1=await OrderDetail.findAll({
        //     include: [
        //         {
        //             model: Product,
        //             as: "product1",

        //         }
        //     ],      
        //     where:{
        //         index_order:userOrder.id

        //     }

        // })
        // console.log(OrderDetail1)





        //         const [results] = await sequelize.query(`
        //         select orders.id as id,orders.status as status,products.name as name,orderdetails.product_quantity as productquantity,products.description as description   from orders



        // inner join orderdetails on orderdetails.index_order=orders.id


        // inner join products on products.id=orderdetails.index_product
        // where orders.index_user=1 `)

        //       const [productDetail]=await sequelize.query(`
        //       select *   from orders
        // inner join orderdetails on orderdetails.index_order=orders.id
        // inner join products on products.id=orderdetails.index_product
        // where orders.index_user=${user.id}

        //       `)

        // res.status(200).send(orderdetail1)
        //  }}

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
const updateOrderAssignment = async (req, res) => {
    const { id } = req.params
    const { index_shipper } = req.body
    const isShipper = await User.findOne({
        where: {
            id: index_shipper,
            type: "shipper"
        }
    })
    if (isShipper) {
        try {
            const detailOrder = await Order.findOne({
                where: {
                    id
                }
            })

            detailOrder.status_order = "Đang Giao"

            await detailOrder.save()
            res.status(200).send(detailOrder)

        } catch (error) {
            res.status(500).send(error)


        }


    }
    else {
        res.status(202).send("Hiện tại chưa có shipper")
    }

}



const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        const orderDetail=await Order.findOne({
            where:{
               id
                
            }
        })
      if(orderDetail.status===3||orderDetail.status===4){
       res.status(200).send({status:500,success:false})
      }
      else{
         await Order.destroy({
            where: {
                id
            }
        })
        res.status(200).send({status:200,success:true})
      }
       
    } catch ({ error }) {
        res.status(500).send(error.message)

    }
}
module.exports = {
    cretaeOrders,
    getOrder,
    getDetailOrder,
    updateOrderAssignment,
    deleteOrder
}