import { configureStore } from "@reduxjs/toolkit";
import menuReducers from "./slice/menuSlice.js";
import shoppingReducers from "./slice/shoppingSlice.js";
import orderReducers from "./slice/orderSlice.js";

export const store = configureStore({
    reducer: {
        menu: menuReducers,
        shoppingCart: shoppingReducers,
        order:orderReducers,
    },
});
