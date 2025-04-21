import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../constant/data.js";

// export const submitShoppingCart = createAsyncThunk(
//     "shoppingCart/orderDetails",
//     async (orderDetails, thunkAPI) => {
//         const state = thunkAPI.getState();
//         // try {
//         //     const response = await fetch(`${BASE_URL}/orders/create-order`, {
//         //         method: "POST",
//         //         headers: {
//         //             "Content-Type": "application/json",
//         //         },
//         //         body: JSON.stringify({
//         //             shoppingCart: state.shoppingCart.shoppingCart,
//         //             name: "shilpi",
//         //         }),
//         //     });

//         //     if (!response.ok) {
//         //         throw new Error("Failed to submit shopping cart");
//         //     }

//         //     const data = await response.json();
//         //     return data;
//         // } catch (error) {
//         //     console.error("Error submitting shopping cart:", error);
//         //     throw error;
//         // }
//     }
// );

const initialState = {
    shoppingCart: [],
    loading: false,
    error: null,
    name: null,
};

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const { item_category, item_categoryId } = action.payload;

            if (state.shoppingCart.length === 0) {
                state.shoppingCart.push({
                    category_name: item_category,
                    category_id: item_categoryId,
                    orderList: [{ ...action.payload, item_quantity: 1 }],
                });
            } else {
                const existingCategoryIndex = state.shoppingCart.findIndex(
                    (category) => category.category_id === item_categoryId
                );

                if (existingCategoryIndex !== -1) {
                    state.shoppingCart[existingCategoryIndex].orderList.push({
                        ...action.payload,
                        item_quantity: 1,
                    });
                } else {
                    state.shoppingCart.push({
                        category_name: item_category,
                        category_id: item_categoryId,
                        orderList: [{ ...action.payload, item_quantity: 1 }],
                    });
                }
            }
        },

        incrementItem(state, action) {
            const { item_categoryId, item_id } = action.payload;

            const existingCategory = state.shoppingCart.find(
                (category) => category.category_id === item_categoryId
            );
            if (existingCategory) {
                const product = existingCategory.orderList.find(
                    (item) => item.item_id === item_id
                );

                if (product) {
                    product.item_quantity++;
                }
            }
        },

        decrementItem(state, action) {
            const { item_categoryId, item_id } = action.payload;

            const existingCategory = state.shoppingCart.find(
                (category) => category.category_id === item_categoryId
            );

            if (existingCategory) {
                const product = existingCategory.orderList.find(
                    (item) => item.item_id === item_id
                );

                if (product && product.item_quantity > 0) {
                    product.item_quantity--;
                }
            }
        },

        removeItemFromCart(state, action) {
            const { item_categoryId, item_id } = action.payload;

            const existingCategory = state.shoppingCart.find(
                (category) => category.category_id === item_categoryId
            );

            if (existingCategory) {
                existingCategory.orderList = existingCategory.orderList.filter(
                    (item) => item.item_id !== item_id
                );
            }
        },
        emptyItemList(state) {
            state.shoppingCart = [];
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(submitShoppingCart.pending, (state, action) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(submitShoppingCart.fulfilled, (state, action) => {
    //             const { name } = action.payload;
    //     state.loading = false;
    //     state.name = name;
    //         })
    //         .addCase(submitShoppingCart.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message;
    //         });
    // },
});

export const selectAllShoppingCart = (state) => state.shoppingCart.shoppingCart;

export const {
    addItemToCart,
    removeItemFromCart,
    incrementItem,
    decrementItem,
    emptyItemList,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
