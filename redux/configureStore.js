import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import campsitesReducer from "./features/campsites/campsitesSlice";
import partnersReducer from "./features/partners/partnersSlice";
import promotionsReducer from "./features/promotions/promotionsSlice";
import commentsReducer from "./features/comments/commentsSlice";

const persistConfig = { key: "root", version: 1, storage };

const rootReducer = combineReducers({
  campsites: campsitesReducer,
  partners: partnersReducer,
  promotions: promotionsReducer,
  comments: commentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
