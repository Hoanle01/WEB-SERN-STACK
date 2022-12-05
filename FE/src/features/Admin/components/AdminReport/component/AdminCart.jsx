import React from 'react'
import Logo from 'assets/img/3737711.png'
import { Card, Col, Row } from 'antd';
import { MoneyCollectOutlined, SnippetsFilled} from '@ant-design/icons';

 function AdminCart(props) {
  const {total,order,product}=props
  return (
    <div className="site-card-wrapper" style={{padding: "30px",
      background: "#ececec"}}>
    <Row gutter={16}>
      <Col span={8}>
        <Card  bordered={false}  >
          <div style={{display:"flex"}}>
            <div>
               <MoneyCollectOutlined style={{fontSize:"53px"}} />
            </div>
            <div style={{marginLeft:"20px",display:"grid"}}>
            <span style={{fontSize:"20px",fontWeight:"bold"}}>Doanh Thu</span>  
            <span style={{fontWeight:"bold",fontSize:"18px"}} >${total}</span>
            </div>
          </div>
        
        </Card>
      </Col>
      <Col span={8}>
        <Card  bordered={false}>
        <div style={{display:"flex"}}>
            <div>
              <SnippetsFilled style={{fontSize:"58px"}}/>
            </div>
            <div style={{marginLeft:"20px",display:"grid"}}>
            <span style={{fontSize:"20px",fontWeight:"bold"}}>Đơn Hàng</span>  
            <span style={{fontWeight:"bold",fontSize:"18px"}} >{order}</span>
            </div>
          </div>
        
        
        </Card>
      </Col>
      <Col span={8}>
        <Card  bordered={false}>
        <div style={{display:"flex"}}>
            <div>
              
          <img src={Logo} style={{width:"49px"}} />
            </div>
            <div style={{marginLeft:"20px",display:"grid"}}>
            <span style={{fontSize:"20px",fontWeight:"bold"}}>Sản Phẩm</span>  
            <span style={{fontWeight:"bold",fontSize:"18px"}} >{product}</span>
            </div>
          </div>
        
        </Card>
      </Col>
    </Row>
  </div>
  )
}
export default AdminCart;