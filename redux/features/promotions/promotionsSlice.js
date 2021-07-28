import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../../shared/baseUrl";

export const getPromotions = createAsyncThunk(
  "promotions/getPromotions",
  async (dispatch, getState) => {
    return await fetch(baseUrl + "promotions").then((res) => res.json());
  }
);

const promotionsSlice = createSlice({
  name: "promotions",
  initialState: {
    promotions: [],
    status: null,
  },
  extraReducers: {
    [getPromotions.pending]: (state, action) => {
      state.status = "Loading";
    },
    [getPromotions.fulfilled]: (state, action) => {
      state.status = "Success";
      state.promotions = action.payload;
    },
    [getPromotions.rejected]: (state, action) => {
      state.status = "Error";
    },
  },
});

export default promotionsSlice.reducer;
