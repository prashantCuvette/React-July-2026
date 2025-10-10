import { useState } from "react";
import styles from "./AddTaskModal.module.css";
import { toast } from "react-hot-toast";

const defaultColors = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#10b981",
  "#06b6d4",
  "#f59e0b",
  "#64748b",
];

const AddTaskModal = ({ task, onClose, onSave, user, priorityLevels }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    color: task?.color || "#6366f1",
    userId: user.id,
    userName: user.name,
    createdAt: task?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    onSave({...formData, id: task?.id || Date.now().toString()});
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>

        <h2 className={styles.modalTitle}>
          {task ? "Edit Task" : "Create New Task"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Task Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={styles.input}
              placeholder="Enter task title..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Add task description..."
              rows="4"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Priority Level</label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className={styles.select}
              >
                {priorityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Border Color</label>
              <div className={styles.colorGrid}>
                {defaultColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={styles.colorButton}
                    style={{
                      backgroundColor: color,
                      border:
                        formData.color === color
                          ? "3px solid #000"
                          : "2px solid #e5e7eb",
                      transform:
                        formData.color === color ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.priorityPreview}>
            <span
              className={styles.priorityBadge}
              style={{
                backgroundColor: priorityLevels.find(
                  (p) => p.value === formData.priority
                )?.color,
              }}
            >
              {priorityLevels.find((p) => p.value === formData.priority)?.label}{" "}
              Priority
            </span>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
