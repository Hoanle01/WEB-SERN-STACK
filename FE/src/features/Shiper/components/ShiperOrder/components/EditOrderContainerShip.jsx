import React from 'react';
import EditOrderForm from './EditOrderForm';
import adminApi from 'api/adminApi';
import { toast } from 'react-toastify';
import withLoading from 'components/HOC/withLoading';
import EditOrderFormShip from './EditOrderForm';
import shiperApi from 'api/shiperApi';
import moment from 'moment';

function EditOrderContainerShip(props) {
  const handleSubmit = async (id, orderStatus,date_create) => {
    props.showLoading('top');
    try {
      const res = await shiperApi.editStatusShiper(id, {
        status: orderStatus,updateddAt:moment().format("DD-MM-YYYY hh:mm:ss")
      });
      if (res.status === 200 && res.success===true) {
        toast.success('Thay đổi thành công')
      }
    } catch (error) {
      toast.error('Error');
    } finally {
      props.hideLoading();
    }
  };
  return <EditOrderFormShip onSubmit={handleSubmit} data={props.data} />;
}

export default withLoading(EditOrderContainerShip);
