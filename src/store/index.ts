import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

export const rootReducer = {
  tasks: taskReducer,
};

const store = create();

export function create(initialState?: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });
}

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
