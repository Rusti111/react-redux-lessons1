import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

const fetchAllStudents = createAsyncThunk('StudentList/fetchall', async (payload, thunkApi) =>{
    try {
        const response = await api.getStudent();

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error?.response || error.message);
    }
});

export default fetchAllStudents; 
