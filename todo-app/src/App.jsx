import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage on update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") {
      alert("You must write something!");
      return;
    }
    setTasks([...tasks, { text: input, checked: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List</h2>
        <div className="row">
          <input
            type="text"
            placeholder="List your tasks here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul className="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.checked ? "checked" : ""}
              onClick={() => toggleTask(index)}
            >
              {task.text}
              <button
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
