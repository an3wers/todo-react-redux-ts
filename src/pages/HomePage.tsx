import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { createTask, fetchTasks } from "../store/taskSlice";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  const { loading, error, list } = useAppSelector((state) => state.tasks);

  const addTask = () => {
    if (input.trim().length) {
      dispatch(createTask(input));
      setInput("");
    }
  };

  useEffect(() => {
    // very simple check
    if(!list.length) {
      dispatch(fetchTasks());
    }
  }, []);

  return (
    <div className="wrap">
      <div className="container py-5">
        <h1>Home</h1>
        <div>
          <Link to="/about">About</Link>
        </div>
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
};

export default HomePage;
