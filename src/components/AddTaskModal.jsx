import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const AddTaskModal = ({ setShowModal }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskTitle, taskDescription);

    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: taskTitle,
        description: taskDescription,
        userId: user.id,
      }),
    });
    const data = await res.json();
    if(data) {
        toast.success("Task added successfully");
    }
    setShowModal(false);
  };

  return (
    <div
      style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}
    >
      <h2>Add task Modal</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <textarea
          placeholder="Task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Task</button>
        <p
          style={{
            cursor: "pointer",
            color: "white",
            width: "50px",
            height: "50px",
            backgroundColor: "red",
          }}
          onClick={() => setShowModal(false)}
        >
          X
        </p>
      </form>
    </div>
  );
};

export default AddTaskModal;
