import { createSlice } from "@reduxjs/toolkit";
import fetchAllStudents from "../reducers/StudentListCreator";

const initialState = {
  students: [],
  isLoading: false,
  studentsError: "",
  studentListStatus: "pending",
};

const studentListSlice = createSlice({
  name: "Students",
  initialState,
  reducers: {
    setStudentsError: (state, action) => {
      state.studentsError = action.payload;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllStudents.pending, (state, action) => {
      state.students = [];
      state.studentsError = "";
      state.isLoading = true;
      state.studentListStatus = "pending";
    });

    builder.addCase(fetchAllStudents.fulfilled, (state, action) => {
      state.students = action.payload;
      state.isLoading = false;
      state.studentListStatus = "fulfilled";
    });

    builder.addCase(fetchAllStudents.rejected, (state, action) => {
      state.studentsError = action.payload;
      state.isLoading = false;
      state.studentListStatus = "rejected";
    });
  },
});

const studentListReducer = studentListSlice.reducer;

export const { setStudentsError } = studentListSlice.actions;
export default studentListReducer;
