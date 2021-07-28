import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../../shared/baseUrl";

export const getCampsites = createAsyncThunk(
  "campsites/getCampsites",
  async (dispatch, getState) => {
    return await fetch(baseUrl + "campsites").then((res) => res.json());
  }
);

const campsitesSlice = createSlice({
  name: "campsites",
  initialState: {
    campsites: [],
    status: null,
  },
  extraReducers: {
    [getCampsites.pending]: (state, action) => {
      state.status = "Loading";
    },
    [getCampsites.fulfilled]: (state, action) => {
      state.status = "Success";
      state.campsites = action.payload;
    },
    [getCampsites.rejected]: (state, action) => {
      state.status = "Error";
    },
  },
});

export default campsitesSlice.reducer;
