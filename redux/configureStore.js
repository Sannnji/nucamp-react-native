import { configureStore } from "@reduxjs/toolkit";

import campsitesReducer from "./features/campsites/campsitesSlice";
import partnersReducer from "./features/partners/partnersSlice";
import promotionsReducer from "./features/promotions/promotionsSlice";
import commentsReducer from "./features/comments/commentsSlice";
import favoriteReducer from "./features/favorites/favoriteSlice";

const store = configureStore({
  reducer: {
    campsites: campsitesReducer,
    partners: partnersReducer,
    promotions: promotionsReducer,
    comments: commentsReducer,
    favorites: favoriteReducer,
  },
});

export default store;
