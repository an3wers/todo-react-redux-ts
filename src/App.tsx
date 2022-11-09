import { useEffect, useState } from 'react';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import { useAppDispatch, useAppSelector } from './hook';
import { fetchTasks, createTask } from './store/taskSlice';

function App() {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.tasks);

  const addTask = () => {
    if (input.trim().length) {
      dispatch(createTask(input));
      setInput('');
    }
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="App">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8">
            <CreateTask
              submitHandler={addTask}
              input={input}
              setInput={setInput}
            />
            {loading && <h3 className="py-5">Загрузка...</h3>}
            {error && <h3 className="py-5">Error: {error}</h3>}
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
