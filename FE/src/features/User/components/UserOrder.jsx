import withLoading from 'components/HOC/withLoading';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactPaginate from 'react-paginate';
import OrderItem from './Order/OrderItem';
import { useLocation, useHistory } from 'react-router-dom';
import userApi from 'api/userApi';
import Skeleton from 'react-loading-skeleton';
import { statusOrder } from 'constant';
const queryString = require('query-string');

function UserOrder({ hideLoading, showLoading }) {
  const location = useLocation();
  const history = useHistory();
  const [orderList, setOrderList] = useState(null);
  console.log(orderList)
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
    };
  }, [location.search]);

  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    const filters = {
      ...queryParams,
      page: currentPage,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const formatData = useCallback((dataList) => {
    
  
    const newOrder = dataList.map((item) => {
     console.log("1345",item.userOrder[2].order_detail[0])
      const newData = {
        id:item.userOrder[0].id,
        dateOder: item.userOrder[0].createdAt,
        product: item.userOrder[2].order_detail.reduce((acc, i, index) => {
          
          if (index === item.userOrder[2].order_detail.length - 1)
         
            return acc + i.product1.name + ' (Số lượng: ' + i.product_quantity + ').';
          return acc + i.product1.name + ' (Số lượng: ' + i.product_quantity + '), ';
        }, ''),
        address:
          item.userOrder[1].address[0].street_name +
          ' ' +
          item.userOrder[1].address[0].ward +
          ' ' +
          item.userOrder[1].address[0].district +
          ' ' +
          item.userOrder[1].address[0].province,
        price: item.userOrder[0].total,
        status:
          item.userOrder[0].status === 1
            ? statusOrder.PENDING
            : item.userOrder[0].status === 2
            ? statusOrder.PROCESSING
            : item.userOrder[0].status === 3
            ? statusOrder.COMPLETED
            : statusOrder.DECLINE,
      };
     
      return newData;
    });

 
    setOrderList(newOrder);

  }, []);

  useEffect(() => {
    (async function () {
      showLoading();
      setLoading(true);
      try {
        const rs = await userApi.getOrders(queryParams);
        
        rs.data && formatData(rs.data);
        // setPagination(rs.pagination);
      } catch (err) {
        // console.log(err);
      }
      hideLoading();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div className='user-order'>
      <ul className='user-order__head'>
        <li className='code'>Mã Đơn Hàng</li>
        <li className='day'>Ngày Mua</li>
        <li className='order-product'>Sản Phẩm</li>
        <li className='order-address'>Địa Chỉ Giao Hàng</li>
        <li className='total-price'>Tổng Tiền</li>
        <li className='order-status'>Trạng Thái</li>
        <li className='order-cancel'>Hủy</li>
      </ul>
      {loading ? (
        <Fragment>
          <Skeleton
            style={{ margin: '10px 0 0 2.5%' }}
            height={50}
            width={'95%'}
            count={6}
          />
        </Fragment>
      ) : (
        <ul className='order-list'>
          {!loading &&
            orderList &&
            orderList.map((item) => <OrderItem order={item} key={item.id} />)}
        </ul>
      )}

      {/* {loading ? (
        <Skeleton
          style={{ float: 'right', marginRight: '2.5%', marginTop: '20px' }}
          height={20}
          width={'10%'}
        />
      ) : (
        <ReactPaginate
          forcePage={parseInt(queryParams.page) - 1}
          pageCount={pagination.totalPages}
          onPageChange={handlePageClick}
          activeClassName='active'
          containerClassName='product-pagi'
          nextLabel='>'
          previousLabel='<'
        />
      )} */}
    </div>
  );
}

export default withLoading(UserOrder);
