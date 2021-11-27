import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        data
      );

      const { user, token } = response.data;

      localStorage.setItem("token", token);

      return user;
    } catch (err) {
      console.log(err);
      const { message } = err.response.data;

      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  errorMessage: null,
};
let decodedUser;

if (localStorage.getItem("token")) {
  decodedUser = parseJwt(localStorage.getItem("token"));
  console.log(decodedUser);
  initialState.user = {
    _id: decodedUser.userId,
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    [login.rejected]: (state, { payload }) => {
      console.log(payload);
      state.errorMessage = payload;
      state.loading = false;
    },
    [login.pending]: (state, { payload }) => {
      state.loading = true;
    },
  },
});

export default authSlice.reducer;

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
