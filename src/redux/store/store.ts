// import {combineReducers, configureStore} from "@reduxjs/toolkit";
// import {userReducer} from "@/redux/slices/userSlice";
// import {venueReducer} from "@/redux/slices/venueSlice";
//
// const rootReducer = combineReducers({
//     users: userReducer,
//     venues: venueReducer
// });
//
// const setupStore = () => configureStore({
//     reducer:rootReducer
// })
//
// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']
//
// export {
//     setupStore
// }

import { configureStore } from '@reduxjs/toolkit';
import {userReducer} from "@/redux/slices/userSlice";
import {venueReducer} from "@/redux/slices/venueSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        venues: venueReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

