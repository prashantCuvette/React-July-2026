import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://localhost:3000/tasks";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        localStorage.setItem("tasks", JSON.stringify(data));
      } else {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      }
    } catch (error) {
      console.log("Failed to Get Tasks");
    }
  };

  const saveTasks = (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const response = await fetch(`${API_URL}/${editingTask.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...taskData,
            updatedAt: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          const updatedTask = await response.json();
          const updatedTasks = tasks.map((t) =>
            t.id === updatedTask.id ? updatedTask : t
          );
          saveTasks(updatedTasks);
        }
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...taskData,
            createdAt: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          const newTask = await response.json();
          saveTasks([...tasks, newTask]);
        }
      }
      setShowModal(false);
      setEditingTask(null);
    } catch (error) {
      console.log("Error While Updating or Adding: ", error.message);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`${API_URL}/${taskId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const updatedTasks = tasks.filter((t) => t.id !== taskId);
          saveTasks(updatedTasks);
        }
      } catch (error) {
        console.log("Error While Deleting: ", error.message);
      }
    }
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleSearchChange = (tasks) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  };

  const filteredTasks =
    filterPriority === "all"
      ? tasks
      : tasks.filter((t) => t.priority === filterPriority);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        showModal,
        setShowModal,
        editingTask,
        setEditingTask,
        filterPriority,
        setFilterPriority,
        searchTerm,
        setSearchTerm,
        handleSaveTask,
        handleEditTask,
        handleDeleteTask,
        handleAddNew,
        handleSearchChange,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  return useContext(TaskContext);
};
