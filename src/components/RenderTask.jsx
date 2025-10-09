import React from "react";

const RenderTask = ({ title, desc }) => {
  return (
    <div
      style={{
        width: "150px",
        height: "200px",
        border: "1px solid black",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default RenderTask;
