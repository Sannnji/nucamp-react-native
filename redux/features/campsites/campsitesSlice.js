import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../../shared/baseUrl";

export const getCampsites = createAsyncThunk(
  "campsites/getCampsites",
  async (dispatch, getState) => {
    return await fetch(baseUrl + "campsites").then((res) => res.json());
  }
);

export const setFavCampsite = createAsyncThunk(
  "campsites/setFavCampsite",
  async (payload) => {
    const response = await fetch(baseUrl + `campsites/${payload.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isFavorite: payload.isFavorite,
      }),
    });
    if (response.ok) {
      const campsite = await response.json();
      return { campsite };
    }
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
    [setFavCampsite.fulfilled]: (state, action) => {
      state.campsites.push(action.payload.campsite);
    },
  },
});

export default campsitesSlice.reducer;
