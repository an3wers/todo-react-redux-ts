interface CreateTaskProps {
  input: string;
  setInput: (value: string) => void;
  submitHandler: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  submitHandler,
  input,
  setInput,
}) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitHandler();
  };

  return (
    <form onSubmit={(e) => submit(e)} className="d-flex align-items-end">
      <div className="flex-grow-1">
        <label htmlFor="inputText" className="form-label">
          Add task
        </label>
        <input
          id="inputText"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary ms-2">
        Add
      </button>
    </form>
  );
};

export default CreateTask;
