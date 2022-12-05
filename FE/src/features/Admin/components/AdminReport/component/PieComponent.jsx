import React from 'react'

import { Line ,Pie} from '@ant-design/plots';
import { Card } from 'antd';

 function PieComponent(props) {
  const {orderMonth,producthasbuy}=props
 
  
  const data = producthasbuy.map((item,index)=>
    ({
      type:item.name,
      value: item.percent,
    }
    ))
 
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <div style={{width:"47%"}}>
       <Card title='Sản Phẩm' style={{borderRadius:"34px"}}>
    
    <div style={{textAlign:"center"}}> <h3>Thống Kê Thể Loại</h3>
     <span style={{textAlign:"center"}}>Thống Kê Số Lượng Thể Loại Đã Bán Ra</span></div>
 <div style={{marginTop:"55px"}}><Pie {...config} /></div>
  
   
       </Card>
   
  
  </div>
  )
};
export default PieComponent