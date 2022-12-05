import { Button, Select } from 'antd';
import { statusOrder } from 'constant';
import { statusShiper } from 'constant/statusShiper';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import moment from "moment";
const { Option } = Select;

const STATUS_ORDER = [
  {
    value: 7,
    title: statusShiper.DELIVERY,
  },
  {
    value: 8,
    title: statusShiper.COMPLETED,
  }
  

  
];

function EditOrderFormShip(props) {
  const [orderState, setOrderState] = useState();
  const { data } = props;
   console.log("orderForm",data.userOrder[0])

  const typeCount = data.userOrder[1].order_detail.length;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { size: 12in ${7 + typeCount * 2}in }`,
  });

  function handleChange(value) {
    setOrderState(value);
  }
  const handleSubmitStatus = () => {
    if (!props.onSubmit) return;
    props.onSubmit(data.userOrder[0].id, orderState
  );
  };
  if (!data) return;
  const productList = data.userOrder[1].order_detail.map((item, index) => {
    console.log(item)
    const product = item.product1;
    const quantity = item.product_quantity;
    const discount =
      product.discount === 'No'
        ? 0
        : parseFloat(product.discount.slice(0, -1) / 100);
    const price = (product.price - product.price * discount).toLocaleString(
      'it-IT',
      {
        style: 'currency',
        currency: 'VND',
      }
    );
    return (
      <div className='item' key={index}>
        <div>
          <p>
            Tên sản phẩm:
            <span> {product.name}</span>
          </p>
          <p>
            Giá:
            <span> {price}</span>
          </p>
          <p>
            Số lượng:
            <span> {quantity}</span>
          </p>
        </div>
        <p>
          <img width='120px' src={product?.image} alt='' />
        </p>
      </div>
    );
  });

  return (
    <div>
      <div ref={componentRef} className='edit-modal-content'>
        <h3>Chi tiết đơn hàng</h3>
        <div className='code'>
          <p>
            Mã đơn hàng:&nbsp;
            <span>{data.id}</span>
          </p>
        </div>
        <label>
          Thời gian đặt hàng:
          <span>
            {' ' +
              new Date(data.date_order * 1000).toLocaleTimeString() +
              ' - ' +
              new Date(data.date_order * 1000).toLocaleDateString()}
          </span>
        </label>
        <label>
          Họ tên:
          <span>&nbsp;{data.userOrder[0].user.name}</span>
        </label>
        <label>
          Số điện thoại:
          <span>&nbsp;{data.userOrder[0].user.numberPhone}</span>
        </label>
        <label>
          Email:
          <span>&nbsp;{data.userOrder[0].user.email}</span>
        </label>
        <label>
          Địa chỉ:
          <span>&nbsp;{data.userOrder[0].address1.street_name}</span>
        </label>
        <label>
          Phường/Xã:
          <span>&nbsp;{data.userOrder[0].address1.ward}</span>
        </label>
        <label>
          Quận/Huyện:
          <span>&nbsp;{data.userOrder[0].address1.district}</span>
        </label>
        <label>
          Tỉnh/TP:
          <span>&nbsp;{data.userOrder[0].address1.province}</span>
        </label>
        {productList}
        <div>
          <p className='item'>
            Tổng số: &nbsp;
            <span>
              {data.userOrder[1].order_detail.reduce(
                (acc, item) => acc + item.product_quantity,
                0
              )}
            </span>
            &nbsp;sản phẩm
          </p>
        </div>
        <div>
          <p className='item total'>
            Tổng số tiền: &nbsp;
            <span>
              {data.userOrder[0].total.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </p>
        </div>
      </div>
      <div
        style={{
          padding: '10px 30px',
          borderTop: '1px solid #ccc',
        }}
      >
        <label>Trạng thái đơn hàng: </label>
        <Select
          defaultValue={data.userOrder[0].status}
          style={{ minWidth: '120px' }}
          size='large'
          onChange={handleChange}
        >
          {STATUS_ORDER.map((item) => {
            return (
              <Option value={item.value} key={item.value}>
                {item.title}
              </Option>
            );
          })}
        </Select>
        <Button
          style={{
            marginLeft: '10px',
          }}
          size='large'
          onClick={handleSubmitStatus}
        >
          Thay đổi
        </Button>
        <Button style={{ float: 'right' }} size='large' onClick={handlePrint}>
          IN
        </Button>
      </div>
    </div>
  );
}

export default EditOrderFormShip;
