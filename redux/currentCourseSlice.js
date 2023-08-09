import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentCourse: {},
};

export const userCourses = createSlice({
  name: "currentCourse",
  initialState: initialState,
  reducers: {
    courseUser: (state, action) => {
      state.currentCourse = { ...action.payload.data };
    },
    unLockLesson: (state, action) => {
      state.currentCourse.unlockedLessons.push(action.payload.unlocklesson);
    },
  },
});

export const { courseUser, unLockLesson } = userCourses.actions;
export default userCourses.reducer;
