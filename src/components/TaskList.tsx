import { useAppSelector } from '../hook';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.list);

  if (tasks.length) {
    return (
      <div className="mt-5">
        {tasks.map((el) => {
          return <TaskItem key={el.id} item={el} />;
        })}
      </div>
    );
  } else {
    return (
      <div>
        <p>Список задач пуст</p>
      </div>
    );
  }
};
export default TaskList;
