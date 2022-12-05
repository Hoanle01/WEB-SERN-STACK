import { dispatch } from 'app/store';
import axios from 'axios';
import { StorageKeys } from 'constant';
import { logout, openModal } from 'features/Auth/userSlice';
import { logoutCart } from 'features/Cart/cartSlice';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const URLS = [
      '/user/user-profile',
      '/user/change-profile',
      '/user/refresh',
      '/favorite',
      '/user/user-profile?width=address',
      '/user/change-address',
      '/order',
      '/is-favorite',
    ];

    const dynamicURL = [
      '/favorite',
    ]
    const dynamicURLNeedToken = dynamicURL.some(item => {
      return config.url.includes(item)
    })

    if (URLS.includes(config.url) || dynamicURLNeedToken) {
      const token = localStorage.getItem(StorageKeys.TOKEN);
      config.headers.token= token ? `${token}` : '';
    }

    const URLSADMIN = [
      'admin/product-list',
      '/admin/products',
      '/admin/orders',
      '/admin/user',
      '/admin/users',
    ]
    const dynamicURLAdminNeedToken = URLSADMIN.some(item => {
      return config.url.includes(item)
    })

    if (dynamicURLAdminNeedToken) {
      const admin = JSON.parse(localStorage.getItem(StorageKeys.ADMIN));
      const token = admin.token;
      config.headers.token= token ? `${token}` : '';
    }




    const URLSShiper = [
     
      '/shiper',
      '/shiper/orders',
      '/shiper/history-order'
    ];
    const dyURL = [
      '/shiper',
     ' /shiper/orders',
     
      '/shiper/history-order'
    ]

    
    const dynamicURLNeedShiperToken = dyURL.some(item => {
      return config.url.includes(item)
    })

    if (URLSShiper.includes(config.url) || dynamicURLNeedShiperToken) {
      const token = localStorage.getItem(StorageKeys.TOKEN);
      config.headers.token= token ? `${token}` : '';
    }


    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status } = error.response;




    if (status === 401) {
      toast.warn('Vui lòng đặng nhập lại!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      if (config.url.includes('/user') && !config.url.includes('/admin')&& !config.url.includes('/shiper')) {
        dispatch(logout());
        dispatch(openModal());
        dispatch(logoutCart());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;