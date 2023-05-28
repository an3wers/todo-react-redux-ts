import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

// const data = window.__SSR_DATA__;
// delete window.__SSR_DATA__;

// const preloadedState = window.__PRELOADED_STATE__;
// delete window.__PRELOADED_STATE__;
// const store = configureStore(preloadedState);

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
