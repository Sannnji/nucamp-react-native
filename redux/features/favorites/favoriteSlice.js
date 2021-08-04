import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../../shared/baseUrl";

export const getFavorites = createAsyncThunk(
  "favorites/getFavorites",
  async () => {
    const response = await fetch(baseUrl + "favorites");
    if (response.ok) {
      const favorites = await response.json();
      return { favorites };
    }
  }
);

export const setFavorite = createAsyncThunk(
  "favorites/setFavorite",
  async (payload) => {
    const response = await fetch(baseUrl + `favorites/${payload.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isFavorite: payload.isFavorite,
      }),
    });
    if (response.ok) {
      const favorite = await response.json();
      console.log(favorite);
      return { favorite };
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    status: null,
  },
  extraReducers: {
    [getFavorites.fulfilled]: (state, action) => {
      state.status = "Success";
      state.favorites = action.payload.favorites;
    },
    [setFavorite.fulfilled]: (state, action) => {
      state.favorites.push(action.payload.favorite);
    },
  },
});

export default favoriteSlice.reducer;
