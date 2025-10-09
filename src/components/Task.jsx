import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import RenderTask from "./RenderTask";

const Task = () => {
  const [showModal, setShowModal] = useState(false);

  const [task, setTask] = useState([]);

  async function fetchTasks() {
    const response = await fetch("http://localhost:3000/tasks");
    const data = await response.json();
    setTask(data);
  }

  useEffect(() => {
    fetchTasks();
  }, [task]);

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div>
      <h1>Task Page</h1>
      <button onClick={handleClick}>Add Task</button>

      {showModal && <AddTaskModal setShowModal={setShowModal} />}

      <h2>Here Are Your Tasks</h2>
      {task.length > 0 ? (
        task.map((item) => (
          <div key={item.id} style={{ display: "flex", gap: "10px" }}>
            <RenderTask title={item.title} desc={item.description} />
          </div>
        ))
      ) : (
        <h3>No Tasks Found</h3>
      )}
    </div>
  );
};

export default Task;
