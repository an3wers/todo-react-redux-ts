import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { create } from "./store";
import { BrowserRouter } from "react-router-dom";

//@ts-ignore
const data = window.__SSR_DATA__;
//@ts-ignore
delete window.__SSR_DATA__;

// const preloadedState = window.__PRELOADED_STATE__;
// delete window.__PRELOADED_STATE__;
// const store = configureStore(preloadedState);

const store = create(data);

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
