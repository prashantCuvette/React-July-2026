import { useCallback, useEffect, useState } from "react";
import TaskModal from "./AddTaskModal";
import RenderTask from "./RenderTask";
import styles from "./Task.module.css";
import { useAuth } from "../contexts/AuthContext";

const priorityLevels = [
  { value: "low", label: "Low", color: "#10b981" },
  { value: "medium", label: "Medium", color: "#f59e0b" },
  { value: "high", label: "High", color: "#ef4444" },
];

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (tasks) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  };

  const { user } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  const saveTasks = (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === editingTask.id
          ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
          : t
      );
      saveTasks(updatedTasks);
    } else {
      saveTasks([...tasks, taskData]);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((t) => t.id !== taskId);
      saveTasks(updatedTasks);
    }
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const filteredTasks =
    filterPriority === "all"
      ? tasks
      : tasks.filter((t) => t.priority === filterPriority);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.mainTitle}>Task Manager</h1>
          <p className={styles.subtitle}>Organize your work efficiently</p>
        </div>
        <button onClick={handleAddNew} className={styles.addButton}>
          ➕ Add New Task
        </button>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Filter by Priority:</label>
        <div className={styles.filterButtons}>
          <button
            onClick={() => setFilterPriority("all")}
            className={`${styles.filterButton} ${
              filterPriority === "all" ? styles.filterButtonActive : ""
            }`}
          >
            All ({tasks.length})
          </button>
          {priorityLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setFilterPriority(level.value)}
              className={`${styles.filterButton} ${
                filterPriority === level.value ? styles.filterButtonActive : ""
              }`}
              style={{ borderColor: level.color }}
            >
              {level.label} (
              {tasks.filter((t) => t.priority === level.value).length})
            </button>
          ))}
        </div>
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          user={user}
          priorityLevels={priorityLevels}
        />
      )}

      <div className={styles.tasksGrid}>
        {filteredTasks.length > 0 ? (
          handleSearchChange(filteredTasks).map((task) => (
            <RenderTask
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              priorityLevels={priorityLevels}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3 className={styles.emptyTitle}>No Tasks Found</h3>
            <p className={styles.emptyText}>
              {filterPriority === "all"
                ? "Create your first task to get started!"
                : `No ${filterPriority} priority tasks found.`}
            </p>
            {filterPriority === "all" && (
              <button onClick={handleAddNew} className={styles.emptyButton}>
                Create Task
              </button>
            )}
          </div>
        )}
      </div>

      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          name="search"
          id="search"
        />
      </div>
    </div>
  );
};

export default Task;
