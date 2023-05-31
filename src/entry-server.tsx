import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { Provider } from "react-redux";
import { fetchTasks } from "./store/taskSlice";
import { create } from "./store";

interface Props {
  path: string;
}

export const render = async ({ path }: Props) => {
  const store = create();

  switch (path) {
    case "/":
      await store.dispatch(fetchTasks());
      break;

    default:
      break;
  }

  const resultRender = renderToString(
    <Provider store={store}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </Provider>
  );
  return [resultRender, store];
};
