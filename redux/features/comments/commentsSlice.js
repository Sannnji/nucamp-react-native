import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../../shared/baseUrl";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async () => {
    const response = await fetch(baseUrl + "comments");
    if (response.ok) {
      const comments = await response.json();
      return { comments };
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (payload) => {
    const response = await fetch(baseUrl + "comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campsiteId: payload.campsiteId,
        rating: payload.rating,
        author: payload.author,
        text: payload.text,
        date: payload.date,
      }),
    });
    if (response.ok) {
      const comment = await response.json();
      console.log(comment);
      return { comment };
    }
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
      state.comments = action.payload.comments;
    },
    [getComments.rejected]: (state, action) => {
      state.status = "Error";
    },
    [addComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload.comment);
    },
  },
});

export default commentsSlice.reducer;
