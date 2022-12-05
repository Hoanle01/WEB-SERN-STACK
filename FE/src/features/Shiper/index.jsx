import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HeaderShiper from './components/HeaderShiper';




import ShiperLogin from './components/ShiperLogin';
import ShiperOrder from './components/ShiperOrder';
import HistoryComponent from './components/ShiperOrder/components/HistoryComponent';
import MyOrder from './components/ShiperOrder/components/MyOrder';
import SidebarShiper from './components/SlidebarShiper';

function ShiperPage() {
  const { path } = useRouteMatch();
  const admin = useSelector((state) => state.shiper.current);
console.log(admin)
  if (!admin) return <ShiperLogin />;
  return (
    <section className='admin'>
   <HeaderShiper/>
      <div className='wrapper-admin'>
    <SidebarShiper/>
        <div className='content'>
          <Switch>
            {/* <Route path={`${path}`} exact component={AdminProduct} />
            <Route path={`${path}/products`} component={AdminProduct} />
            
            <Route path={`${path}/users`} component={AdminUser} />
            <Route path={`${path}/report`} component={Report} />
            
            

            <Route /> */}
            <Route path={`${path}/orders`} component={ShiperOrder} />
            <Route path={`${path}/my-order`} component={MyOrder} />
            <Route path={`${path}/history-shiper`} component={HistoryComponent} />

          </Switch>
        </div>
      </div>
    </section>
  );
}

export default ShiperPage;
