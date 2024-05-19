import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { setCart } from "../slices/Cart";

const fetchAllStudents = createAsyncThunk(
  "cart/fetchall",
  async (payload, thunkApi) => {
    try {
      const response = await api.getCart();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const createItem = (student, item = {}, quantity) => {
  const { Name = student.Name, id = student.id, count = 0, total = 0 } = item;

  return {
    Name,
    id,
    count: count + quantity,
    total: total + student.price * quantity,
  };
};

export const fetchToAddItem = createAsyncThunk(
  "cart/addItem",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
      const { students } = thunkApi.getState().studentList;
      const { cart } = thunkApi.getState().cartList;
      const student = students.find(({ id }) => id === payload);
      const item = cart.find(({ id }) => id === payload);
      console.log(dispatch);
      const newItem = createItem(student, item, 1);
      console.log("cart", cart);
      const newarr = [...cart, newItem];
      if (!item) {
        api.addCartItem(newItem);
        return dispatch(setCart(newarr));
      } else {
        api.updateCartItem(newItem);
        return dispatch(
          setCart(cart.map((el) => (newItem.id === el.id ? newItem : el)))
        );
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchToRemuveItem = createAsyncThunk(
  "cart/remuveItem",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
      const { students } = thunkApi.getState().studentList;
      const { cart } = thunkApi.getState().cartList;
      const student = students.find(({ id }) => id === payload);
      const item = cart.find(({ id }) => id === payload);

      const newItem = createItem(student, item, -1);
      console.log(newItem);

      if (item.count <= 1) {
        await api.deleteItem(payload);
        return dispatch(setCart(cart.filter(({ id }) => id !== payload)));
      } else {
        await api.updateCartItem(newItem);
        return dispatch(
          setCart(cart.map((el) => (newItem.id === el.id ? newItem : el)))
        );
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const fetchToDeleteItem = createAsyncThunk(
  "cart/deleteItem",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
      console.log(payload);
      const { students } = thunkApi.getState().studentList;
      const { cart } = thunkApi.getState().cartList;
      const student = students.find(({ id }) => id === payload);
      const item = cart.find(({ id }) => id === payload);

      const newItem = createItem(student, item, 0);
      console.log(newItem);

      await api.deleteItem(payload);
      return dispatch(setCart(cart.filter(({ id }) => id !== payload)));
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export default fetchAllStudents;
