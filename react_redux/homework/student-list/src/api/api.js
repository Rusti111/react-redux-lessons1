import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:5000' });

const getStudent = () => instance.get('/students');
const getCart = () => instance.get('/cart');
const addCartItem = (payload) => instance.post('/cart', payload);
const updateCartItem = (payload) => instance.put(`/cart/${payload.id}`, payload);
const deleteItem = (payload) => instance.delete(`/cart/${payload}`);

export const api = {
    getStudent,
    getCart,
    addCartItem,
    updateCartItem,
    deleteItem,
};
