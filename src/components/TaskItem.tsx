import { useAppDispatch } from '../hook';
import { removeTask, completeTask } from '../store/taskSlice';

interface TaskItemProps {
  item: {
    id: string;
    title: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="card mb-2">
      <div className="card-body d-flex">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => dispatch(completeTask(item.id))}
          className="form-check-input"
        />
        <p
          className={`card-text flex-grow-1 mx-2 ${
            item.completed && 'text-decoration-line-through'
          }`}
        >
          {item.title}
        </p>
        <button
          onClick={() => dispatch(removeTask(item.id))}
          className="btn btn-sm btn-outline-danger lh-1"
        >
          rmv
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
