import { Table } from 'antd';
import moment from 'moment';
import React from 'react';

function OrderItem({ order }) {
   console.log("order",order)
  return (
   
    <li className='order-item'>
      <span className='code'>{order.id}</span>
      <span className='day'>
       
      {  moment(order.dateOrder).format('DD-MM-YYYY hh:mm:ss')}
      
      </span>
      <p className='order-product'>{order.product}</p>
      <p className='order-address'>{order.address}</p>
      <span className='total-price price'>
        {order.price.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </span>
      <span className='order-status'>{order.status}</span>
    </li>
  );
}

export default OrderItem;
