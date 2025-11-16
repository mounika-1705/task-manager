import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    addTask({ title }); //title
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter new task" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;