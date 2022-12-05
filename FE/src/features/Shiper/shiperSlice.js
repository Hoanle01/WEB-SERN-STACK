import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import shiperApi from 'api/shiperApi';
import { StorageKeys } from 'constant';


export const login = createAsyncThunk('shiper/login', async (payload) => {
  const {data }= await shiperApi.login(payload);
console.log(data.token)
  const shiper = {
    name: data.name,
    id: data.id,
    token: data.token,
  
  }
  // //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.token);
  localStorage.setItem(StorageKeys.SHIPER, JSON.stringify(shiper));

   return data;
});
const initialState = {
  current : JSON.parse(localStorage.getItem(StorageKeys.SHIPER)) || null,
};
export const userSlice = createSlice({
  name: 'shiper',
  initialState,
  reducers: {
    shiperLogout: (state) => {
      state.current = null;
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.SHIPER);
    },
    },
  
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const shiper = {
        name: action.payload.name,  
        id: action.payload.id,
        token: action.payload.token,
      }
      state.current = shiper;
    },
  },
});

export const { shiperLogout } = userSlice.actions;

export default userSlice.reducer;