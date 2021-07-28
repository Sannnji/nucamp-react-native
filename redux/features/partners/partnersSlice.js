import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../../shared/baseUrl";

export const getPartners = createAsyncThunk(
  "partners/getPartners",
  async (dispatch, getState) => {
    return await fetch(baseUrl + "partners").then((res) => res.json());
  }
);

const partnersSlice = createSlice({
  name: "partners",
  initialState: {
    partners: [],
    status: null,
  },
  extraReducers: {
    [getPartners.pending]: (state, action) => {
      state.status = "Loading";
    },
    [getPartners.fulfilled]: (state, action) => {
      state.status = "Success";
      state.partners = action.payload;
    },
    [getPartners.rejected]: (state, action) => {
      state.status = "Error";
    },
  },
});

export default partnersSlice.reducer;
