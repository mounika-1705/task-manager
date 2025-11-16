import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  //fetch all tasks from backend
  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log("Error fetching tasks:", err));
  };

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  // Adding tasks
  const addTask = (task) => {
    fetch("http://127.0.0.1:8000/tasks", {
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
    fetch(`http://127.0.0.1:8000/tasks/${id}`, { method: "DELETE" })
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