import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../../shared/baseUrl";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (dispatch, getState) => {
    return await fetch(baseUrl + "comments").then((res) => res.json());
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: null,
  },
  extraReducers: {
    [getComments.pending]: (state, action) => {
      state.status = "Loading";
    },
    [getComments.fulfilled]: (state, action) => {
      state.status = "Success";
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.status = "Error";
    },
  },
});

export default commentsSlice.reducer;
