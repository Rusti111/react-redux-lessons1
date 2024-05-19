import { configureStore } from "@reduxjs/toolkit";
import studentListReducer from "./slices/StudentList";
import cartReducer from "./slices/Cart";

const reducer = {
    studentList: studentListReducer,
    cartList: cartReducer,
};

const store = configureStore({ reducer });
export default store;


