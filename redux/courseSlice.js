import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  courses: [],
  lessons: [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    addCourses: (state, action) => {
      console.log(action.payload);
      state.courses = action.payload.data;
    },
    addLessons: (state, action) => {
      state.lessons = [
        { easy: action.payload.easy },
        { mid: action.payload.mid },
        { hard: action.payload.hard },
      ];
    },
  },
});

export const { addCourses, addLessons } = courseSlice.actions;
export default courseSlice.reducer;
