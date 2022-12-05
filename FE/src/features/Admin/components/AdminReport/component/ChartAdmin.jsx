import React from 'react'

import { Line } from '@ant-design/plots';
import { Card } from 'antd';
 function ChartAdmin(props) {
  const {orderMonth}=props
  const data = orderMonth.map((item,index)=>
  
  (
    {
      month: item.date,
      value: item.total,
    }
   
  ))
  const config = {
    data,
    xField: 'month',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  
  return  (
    
 <div style={{width:"47%"}}>
  <Card title='Doanh Thu' style={{borderRadius:"34px"}}>
    
   <div style={{textAlign:"center"}}> <h3>Thống Kê Doanh Thu</h3>
    <span style={{textAlign:"center"}}>Thống Kê Doanh Thu Theo Tháng</span></div>
<div style={{marginTop:"55px"}}><Line {...config} style={{width:"90%"}} /></div>
 
  
      </Card>
  
 
    
  

   
  
  </div>
  )
};
export default ChartAdmin