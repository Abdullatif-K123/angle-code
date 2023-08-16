import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    role: "",
    user_name: "",
    token: "",
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    about: "",
    avatar: "",
    userId: "",
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logoutUser: (state, action) => {
      state.user.email = action.payload.email;
    },
  },
});

export const { login, logoutUser } = userSlice.actions;
export default userSlice.reducer;
