import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./store/taskSlice";

interface Props {
  path: string;
}

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export const render = ({ path }: Props) => {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </Provider>
  );
};
