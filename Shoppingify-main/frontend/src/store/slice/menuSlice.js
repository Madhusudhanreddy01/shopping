import { createSlice } from "@reduxjs/toolkit";

const initialState = [
      
];

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        addItemToMenu: (state, action) => {
            state.push(action.payload)
        }
    },
});

export const selectAllmenu = (state) => state.menu;

export const { addItemToMenu } = menuSlice.actions;

export default menuSlice.reducer;
