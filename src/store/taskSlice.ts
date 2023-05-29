import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TasksState = {
  list: Task[];
  loading: boolean;
  error: string | null;
  testList: any[]
};

// fetch tasks
export const fetchTasks = createAsyncThunk<
  Task[],
  undefined,
  { rejectValue: string }
>('tasks/fetchTasks', async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=10'
    );
    if (!response.ok) {
      throw new Error('Server error');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// async add new task
export const createTask = createAsyncThunk<
  Task,
  string,
  { rejectValue: string }
>('tasks/createTask', async function (title, { rejectWithValue }) {
  const task = {
    userId: 1,
    title: title,
    completed: false,
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Can't, toggle complete. Server Error");
    }

    const data: Task = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// toggle status async
export const toggleTask = createAsyncThunk<
  Task,
  string,
  { rejectValue: string; state: { tasks: TasksState } }
>(
  'tasks/toggleTask',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const task = getState().tasks.list.find((el) => el.id === id);
    if (task) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              completed: !task.completed,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Can't, toggle complete. Server Error");
        }
        const data: Task = await response.json();
        return data;
        // console.log(data);
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
    return rejectWithValue('Task not found');
  }
);

// async delete task
export const deleteTask = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('tasks/deleteTask', async function (id, { rejectWithValue, dispatch }) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'DELETE',
      }
    );
    // console.log(response);
    if (!response.ok) {
      throw new Error("Can't, delete task. Server Error");
    }
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: TasksState = {
  list: [],
  loading: false,
  error: null,
  testList: ['123', '456', '789']
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    // addTask(state, action: PayloadAction<string>) {
    //   // console.log(action.payload);
    //   // state.tasks.push(action.payload);
    //   state.list.push({
    //     id: new Date().toISOString(),
    //     title: action.payload,
    //     completed: false,
    //   });
    // },
    // removeTask(state, action: PayloadAction<string>) {
    //   state.list = state.list.filter((el) => el.id !== action.payload);
    // },
    // completeTask(state, action: PayloadAction<string>) {
    //   state.list = state.list.map((el) => {
    //     if (el.id === action.payload) {
    //       return { ...el, completed: !el.completed };
    //     }
    //     return el;
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        state.list = state.list.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, completed: !el.completed };
          }
          return el;
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((el) => el.id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
// export const { addTask, removeTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
