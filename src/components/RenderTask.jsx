import React from "react";
import styles from "./RenderTask.module.css";

const RenderTask = ({ task, onEdit, onDelete, priorityLevels }) => {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const priorityColor = priorityLevels.find(
    (p) => p.value === task.priority
  )?.color;

  return (
    <div
      className={styles.taskCard}
      style={{ borderLeft: `5px solid ${task.color}` }}
    >
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
        <span
          className={styles.priorityBadge}
          style={{ backgroundColor: priorityColor }}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>

      {task.description && (
        <p className={styles.taskDescription}>{task.description}</p>
      )}

      <div className={styles.taskMeta}>
        <div className={styles.metaItem}>
          <span className={styles.metaIcon}>👤</span>
          <span className={styles.metaText}>{task.userName}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaIcon}>📅</span>
          <span className={styles.metaText}>{formatDate(task.createdAt)}</span>
        </div>
      </div>

      <div className={styles.taskActions}>
        <button onClick={() => onEdit(task)} className={styles.editButton}>
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className={styles.deleteButton}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default RenderTask;
