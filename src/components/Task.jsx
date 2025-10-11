import TaskModal from "./AddTaskModal";
import RenderTask from "./RenderTask";
import styles from "./Task.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useTask } from "../contexts/Task.jsx";

const priorityLevels = [
  { value: "low", label: "Low", color: "#10b981" },
  { value: "medium", label: "Medium", color: "#f59e0b" },
  { value: "high", label: "High", color: "#ef4444" },
];

const Task = () => {
  const { user } = useAuth();
  const {
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
  } = useTask();

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
        <div>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            name="search"
            id="search"
            className={styles.searchInput}
            placeholder="Search tasks..."
          />
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
    </div>
  );
};

export default Task;
