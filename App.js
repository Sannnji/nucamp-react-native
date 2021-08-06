import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Main from "./components/Main";
import store from "./redux/configureStore";
import { persistor } from "./redux/configureStore";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
