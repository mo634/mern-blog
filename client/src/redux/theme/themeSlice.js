import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "dark",
};


const themeSlice = new createSlice({
    name: "theme",

    initialState,

    reducers:{
        togglemode:(state)=>{
            state.theme = state.theme === "light"? "dark" : "light"
        }
    }
})

export const {togglemode} = themeSlice.actions
export default themeSlice.reducer