import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TasksState = {
  list: Task[];
};

const initialState: TasksState = {
  list: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      // console.log(action.payload);
      // state.tasks.push(action.payload);

      state.list.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      });
    },
    removeTask(state, action: PayloadAction<string>) {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    completeTask(state, action: PayloadAction<string>) {
      state.list = state.list.map((el) => {
        if (el.id === action.payload) {
          return { ...el, completed: !el.completed };
        }
        return el;
      });
    },
  },
});
export const { addTask, removeTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;
