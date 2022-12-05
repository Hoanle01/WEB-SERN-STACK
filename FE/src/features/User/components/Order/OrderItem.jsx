import { Button, Table } from 'antd';
import userApi from 'api/userApi';
import DeleteOrder from 'features/Admin/components/AdminProduct/components/DeleteOrder';
import moment from 'moment';
import React from 'react';

function OrderItem({ order }) {
  

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
      
        <DeleteOrder id={order.id} status={order.status}/>
    </li>
  );
}

export default OrderItem;
