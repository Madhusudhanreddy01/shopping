import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constant/data";

const initialState = {
    orderItem: [],
    name,
};

export const submitShoppingCart = createAsyncThunk(
    "order/orderDetails",
    async (orderDetails, thunkAPI) => {
        const state = thunkAPI.getState();
        // console.log("order item inside the oderslice")
        // console.log(state.order.orderItem)
        try {
            const response = await fetch(`${BASE_URL}/orders/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shoppingCart: state.order.orderItem,
                    name: "lakshmi",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit shopping cart");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error submitting shopping cart:", error);
            throw error;
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const { item_id, item_name, item_category, item_categoryId } =
                action.payload;
            let order = {
                item_id,
                item_name,
                item_category,
                item_categoryId,
                item_quantity: 1,
            };
            state.orderItem.push(order);
        },
        incrementCount: (state, action) => {
            const { item_id } = action.payload;
            const item = state.orderItem.find(
                (item) => item.item_id === item_id
            );
            if (item) {
                item.item_quantity++;
            }
        },
        decrementCount: (state, action) => {
            const { item_id } = action.payload;
            const item = state.orderItem.find(
                (item) => item.item_id === item_id
            );
            if (item && item.item_quantity > 0) {
                item.item_quantity--;
            }
        },
        removeitem: (state, action) => {
            const { item_id } = action.payload;
            const items = state.orderItem.filter(
                (item) => item.item_id !== item_id
            );
            state.orderItem = items;
        },
        emptyItem(state) {
            state.orderItem = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitShoppingCart.pending, (state, action) => {})
            .addCase(submitShoppingCart.fulfilled, (state, action) => {})
            .addCase(submitShoppingCart.rejected, (state, action) => {});
    },
});

export const selectAllOrders = (state) => state.order;

export const {
    addtoCart,
    incrementCount,
    decrementCount,
    removeitem,
    emptyItem,
} = orderSlice.actions;

export default orderSlice.reducer;
