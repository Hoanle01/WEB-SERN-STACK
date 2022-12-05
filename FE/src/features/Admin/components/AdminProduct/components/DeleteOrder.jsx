import { Button } from 'antd';
import adminApi from 'api/adminApi';
import userApi from 'api/userApi';
import { statusOrder } from 'constant';
import React from 'react';
import { toast } from 'react-toastify';

function DeleteOrder({ id,status }) {
  const handleDelete = async () => {
    
    try {
      const res = await userApi.deleteOrder(id);
     
      if(res.status === 200 && res.success === true){
        toast.success('xóa thành công!');
      }
      else{
        toast.warning(`Không thể xóa đơn hàng `);
      }
    } catch (error) {}
   };
  return <Button style={{display: 'block', margin: '1px 13px 0'}} onClick={handleDelete}>
    <i className="fas fa-trash-alt"></i>
  </Button>;
}

export default DeleteOrder;