import { Button } from 'antd';
import shiperApi from 'api/shiperApi';
import React, { Fragment } from 'react';
import { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import EditOrderContainerShip from './EditOrderContainerShip';
import EditOrderContainer from './EditOrderContainerShip';

function EditOrderShip(props) {
  const [openModal, setOpenModal] = useState(false);
  const {data}=props
  const shiper = useSelector((state) => state.shiper.current);

  const addShiper=()=>{
   //alert(data.userOrder[0].id)
  if (shiper){ 
    (async function(){
    try {
      const res=await shiperApi.createShiper(data.userOrder[0].id)
    
     toast.success("Đã thêm vào đơn hàng cần giao")
    } catch (error) {
      
    }
   })()
   return   
 
   }

}
const declineOrder=()=>{
  if(shiper)
  {(async function(){
    try {
      const res=await shiperApi.deleteOrder(data.userOrder[0].id)
    toast.success('Xóa Thành Công')
    } catch (error) {
      toast.error("Error")
    }
   })()
   return   
  } 
   
}
  return (
    <Fragment>
      
        <button onClick={declineOrder}>Từ chối </button>     
   
       <button onClick={addShiper}>Giao hàng</button>   
      <Modal
        isOpen={openModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            zIndex: '1000',
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.53)',
            cursor: 'poiter',
          },
          content: {
            position: 'absolute',
            top: '5%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            border: 'none',
            background: 'rgb(255, 255, 255)',
            overflow: 'unset',
            borderRadius: '4px',
            outline: 'none',
            padding: '0',
            transform: 'translateX(-50%)',
          },
        }}
      >
        <div
          style={{
            display: 'inline-block',
            cursor: 'pointer',
            padding: '20px',
            position: 'absolute',
            top: '-15px',
            fontSize: '30px',
            right: '0',
            color: '#01adab',
          }}
          onClick={() => {
            setOpenModal(false);
            props.onEdit();
          }}
        >
          X
        </div>
        <EditOrderContainerShip data={props.data} />
      </Modal>
    </Fragment>
  );
}

export default EditOrderShip;
