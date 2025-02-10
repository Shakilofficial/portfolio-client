import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

export type TUser = {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      storage.removeItem("persist:auth");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserRole = (state: RootState): string | null =>
  state.auth.user ? state.auth.user.role : null;
export const selectUserEmail = (state: RootState): string | null =>
  state.auth.user ? state.auth.user.email : null;
