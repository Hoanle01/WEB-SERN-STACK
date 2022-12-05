import adminApi from 'api/adminApi';
import withLoading from 'components/HOC/withLoading'
import React, { useEffect, useState } from 'react'
import AdminCart from './component/AdminCart';
import ChartAdmin from './component/ChartAdmin';
import PieComponent from './component/PieComponent';

 function Report() {
  const [loading, setLoading] = useState(true);
const [totals,setTotals]=useState([])
const [order,setOrder]=useState([])

 const [product,setProduct]=useState([])
 const [orderMonth,setOrderMonth]=useState([])
 const [producthasbuys,setProducthasbuys]=useState([])

 const mapData = (data) => {

const newData = data.map((item, index) => ({
  date:item.date,
  total:item.total
}))
setOrderMonth(newData)
 }
useEffect(async()=>{
    setLoading(true);
    try {
        const res = await adminApi.totalOrder();
        setTotals(res[0].total)
        const countorder=await adminApi.countOrder()
        
        setOrder(countorder[0].count)
        const countproduct=await adminApi.countProduct()
        setProduct(countproduct[0].count)
        const ordermonth=await adminApi.ordertoMonth()
        
        mapData(ordermonth)
        const producthasbuy=await adminApi.producthasbuy()
        setProducthasbuys(producthasbuy)
    } catch (error) {
      
    } 
  
},[])



  return (
    <div style={{padding: "30px",
    background: "#ececec"}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <div
          style={{
            height: '40px',
            textAlign: 'center',
            fontSize: '19px',
            color: '#505050',
            float: 'left',
          }}
        >
        <span style={{fontSize:"20px",fontWeight:"bold"}}>Thống kê</span>
        </div>
          
       
      </div>
       <AdminCart total={totals} order={order} product={product}/>
       <div style={{display:"flex",justifyContent:"space-around"}}>
       <ChartAdmin orderMonth={orderMonth} />
       <PieComponent producthasbuy={producthasbuys}/></div>
    </div>
  )
}
export default withLoading(Report)
