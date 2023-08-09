import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import courseReducer from "./courseSlice";
import userCourseReducer from "./currentCourseSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      course: courseReducer,
      userCourse: userCourseReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
