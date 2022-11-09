import { useState } from 'react';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import { useAppDispatch } from './hook';
import { addTask } from './store/taskSlice';

function App() {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  const createTask = () => {
    if (input.trim().length) {
      dispatch(addTask(input));
      setInput('');
    }
  };

  return (
    <div className="App">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8">
            <CreateTask
              submitHandler={createTask}
              input={input}
              setInput={setInput}
            />
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
