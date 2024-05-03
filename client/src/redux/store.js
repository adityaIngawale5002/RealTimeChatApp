import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth'
import api from './api/api';
import miscSlice from './reducers/misc';
import chatSlice from './reducers/Chat';


export const  store=configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer,
        [api.reducerPath]:api.reducer,
        [miscSlice.name]:miscSlice.reducer,
        [chatSlice.name]:chatSlice.reducer,
    },
    middleware:(defaultMiddleware)=>[...defaultMiddleware(),api.middleware,],
})