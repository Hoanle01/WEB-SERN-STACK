const { default: axiosClient } = require('./axiosClient');

const adminApi = {
  login (data) {
    const url = '/admin/admin-login';
    return axiosClient.post(url, data);
  },
  getAllProduct (params) {
    const url = 'admin/product-list';
    return axiosClient.get(url, { params: { ...params, width: 'category,images', } })
  },
  addProduct (data) {
    
    const url = '/admin/products';
    return axiosClient.post(url, data);
  },
  deleteProduct (id) {
    const url = `/admin/products/${id}`;
    return axiosClient.delete(url);
  },
  editProduct (id,data) {
    const url = `/admin/products/${id}`;
    return axiosClient.post(url, data);
  },
  getAllOrder () {
    const url = '/admin/orders?with=user.address';
    return axiosClient.get(url);
  },
  editStatusOrder (id, data) {
   
    const url = `/admin/orders/${id}`;
    return axiosClient.patch(url, data);
  },
  getUserList () {
    const url = `/admin/users`;
    return axiosClient.get(url);
  },
  deleteUser (id) {
    const url = `/admin/user/${id}`;
    return axiosClient.delete(url);
  },
}

export default adminApi;