import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'features/Auth/userSlice';
import cartReducer from 'features/Cart/cartSlice';
import adminReducer from 'features/Admin/adminSlice';
import shiperReducer from 'features/Shiper/shiperSlice';

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
  admin: adminReducer,
  shiper: shiperReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export const dispatch = store.dispatch;
