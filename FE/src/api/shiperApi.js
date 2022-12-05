const { default: axiosClient } = require('./axiosClient');
const shiperApi={
    login (data) {
        const url = '/shiper/login'; 
        
        return axiosClient.post(url, data);
       
      },
      getAllOrder () {
        const url = '/shiper/orders';
        return axiosClient.get(url);
      },
      createShiper (id) {
        const url = `/shiper/${id}`;
        return axiosClient.post(url);
      },
      myOrder(){
        const url = '/shiper/my-order';
        return axiosClient.get(url);
      },
      deleteOrder(id){
        const url=`/shiper/delete/${id}`
        return axiosClient.put(url);

      },
      editStatusShiper(id, data) {
   
        const url = `/shiper/status-shiper/${id}`;
        return axiosClient.put(url, data);
      },
      historyshiper(){
        const url = '/shiper/history-shiper';
        return axiosClient.get(url);
      }
}
export default shiperApi;