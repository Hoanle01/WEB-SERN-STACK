import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function SidebarShiper() {
  const location = useLocation();
  const history = useHistory();
  const sidebarList = useMemo(() => {
    return [
    
      {
        id: 1,
        iconClassName: 'fas fa-file-invoice-dollar',
        title: 'Đơn hàng',
        path: '/shiper/orders'
      },{
        id: 2,
        iconClassName: 'fas fa-file-invoice-dollar',
        title: 'Đơn giao ',
        path: '/shiper/my-order'
      },
    {
        
          id: 3,
          iconClassName: 'fas fa-history',
          title: 'Lịch sử',
          path: '/shiper/history-shiper',
        
      }
    ];
  }, []);
  return (
    <div className='sidebar-admin'>
      <h4>Quản Lý</h4>
      <ul>
        {sidebarList.map((item) => (
          <li
            key={item.id}
            className={location.pathname.includes(item.path) ? 'active' : ''}
            onClick={() => {
              history.push(item.path)
            }}
          >
            <i className={item.iconClassName}></i>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarShiper;
