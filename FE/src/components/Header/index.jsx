import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryApi from 'api/categoryApi';
import headerLogo from 'assets/img/header-logo.png'
import userIcon from 'assets/img/user-icon.svg';
import ModalAuth from 'features/Auth/components/ModalAuth';
import { closeModal, logout, openModal } from 'features/Auth/userSlice';
import { logoutCart } from 'features/Cart/cartSlice';
import { cartItemsCountSelector } from 'features/Cart/selector';

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');
  const modalIsOpen = useSelector((state) => state.user.modalIsOpen);
  
  const user = useSelector((state) => state.user.current);

  const countCart = useSelector(cartItemsCountSelector);
  useEffect(() => {
    (async function () {
      try {
        const data = await categoryApi.getCategories();
        
        setCategoryList(data);
      } catch (error) {}
    })();
  }, []);

  const handleButtonLoginLogoutClick = () => {
    if (!user) {
      const action = openModal();
      dispatch(action);
      return;
    }
    const action = logout();
    dispatch(action);
    const actionCart = logoutCart();
    dispatch(actionCart);
    history.replace('/');
  };
  const handleCloseModal = () => {
    const action = closeModal();
    dispatch(action);
  };
   const removeVietnameseTones=(str)=> {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const inputsearch=removeVietnameseTones(inputValue)
    setInputSearch(inputValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.replace(`/product?name=${inputSearch}`);
  };

  const handleCartClick = () => {
    if (!user) {
      const action = openModal();
      dispatch(action);
      toast.warn('Đăng nhập để xem giỏ hàng!');
      return;
    }
    history.push('/cart');
  };

  const handleUserClick = () => {
    if (!user) {
      const action = openModal();
      dispatch(action);
      toast.warn('Đăng nhập để xem thông tin!');
      return;
    }
    history.push('/user');
  };

  const handleCategoryChange = (id) => {
    if(location.pathname + location.search === `/product?index_categories=${id}`) return;
    history.push({
      pathname: '/product',
      search: `?index_categories=${id}`,
    });
  };

  const handleAll = () => {
    if(location.pathname + location.search === '/product') return;
    history.push('/product');
  };

  return (
    <Fragment>
      <header>
        <div className='header container'>
          <Link to='/' className='header__logo'>
            <img src={headerLogo} style={{width: "71%",
    marginLeft: "-35%",
   
    marginTop:" -15px"}} alt='' />
          </Link>
          <div className='header__search'>
            <form onSubmit={handleSubmit} className='header__search-main'>
              <input
                onChange={handleInputChange}
                value={inputSearch}
                type='text'
                placeholder='Bạn  tìm  gì...'
              />
              <button type='submit'>
                <i className='fas fa-search'></i>
                <span>Tìm kiếm</span>
              </button>
            </form>
            <div className='header__search-product'>
              <div onClick={handleAll}>Tất cả</div>
              {categoryList?.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleCategoryChange(item.id)}
                >
                  {item.name}
                </div>
                // <Link key={item.id} to={`/product?category=${item.id}`}>
                //   {item.name}
                // </Link>
              ))}
            </div>
          </div>
          <div onClick={handleCartClick} className='header__cart'>
            <span className='cart__noti-number'>{countCart || 0}</span>
            <i className='fas fa-shopping-cart'></i>
            <p>Giỏ hàng</p>
          </div>
          <div className='header__user'>
            <img src={userIcon} alt='user logo' />
            <div className='user-log'>
              <div onClick={handleButtonLoginLogoutClick}>
                {!user ? 'Đăng Nhập' : 'Đăng Xuất'
                
                }
                
              </div>
              <div onClick={handleUserClick}>
                {!user ? 'Tài khoản' :user?.name?.split(' ')?.pop()}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            zIndex: '1000',
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.53)',
            cursor: 'poiter',
          },
          content: {
            position: 'absolute',
            top: '5%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            border: 'none',
            background: 'rgb(255, 255, 255)',
            overflow: 'unset',
            borderRadius: '4px',
            outline: 'none',
            padding: '0',
            transform: 'translateX(-50%)',
          },
        }}
      >
        <ModalAuth />
      </Modal>
    </Fragment>
  );
}

export default Header;
