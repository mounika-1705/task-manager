import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [tasks, setTasks] = useState([]);

  //fetch tasks from backend
  const fetchTasks = () => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log("Error fetching tasks:", err));
  };

  //Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  //Adding tasks
  const addTask = (task) => {
    fetch(`${API_URL}/tasks`, {
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

  //Delete task
  const deleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" })
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