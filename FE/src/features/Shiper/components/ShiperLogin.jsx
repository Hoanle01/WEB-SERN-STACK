import React from 'react';
// import AdminLoginForm from './AdminLoginForm';
import withLoading from 'components/HOC/withLoading';
import { useDispatch } from 'react-redux';
import { login } from '../shiperSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ShiperLoginForm from './ShiperLoginForm';

function ShiperLogin (props) {
  const {showLoading, hideLoading} = props;
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    showLoading('top');
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      toast.success('Đặng nhập thành công!');
    } catch (error) {
      console.log(error);
      toast.error('Tài khoản không hợp lệ!');
    }
    hideLoading();
  };
  return (
    <ShiperLoginForm onSubmit={handleSubmit}/>
  );
}

export default withLoading(ShiperLogin);