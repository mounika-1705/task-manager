import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks from backend
  const fetchTasks = () => {
    fetch(`${import.meta.env.VITE_API_URL}`/tasks)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log("Error fetching tasks:", err));
  };

  // Load tasks on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = (task) => {
    fetch(`${import.meta.env.VITE_API_URL}`/tasks, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTasks();
      })
      .catch((err) => console.log("Add task error:", err));
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.log("Delete error:", err));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default App;