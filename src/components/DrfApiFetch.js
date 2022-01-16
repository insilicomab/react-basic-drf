import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState([]);

  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token 5996f3ff9ce3bfbe3e2d37f1ad2a2d2f1f29fe47",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 5996f3ff9ce3bfbe3e2d37f1ad2a2d2f1f29fe47",
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} id: {task.id}
          </li>
        ))}
      </ul>
      Set id <br />
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <br />
      <button type="button" onClick={() => getTask()}>
        Get task
      </button>
      <h3>{selectedTask.title}</h3>
    </div>
  );
};

export default DrfApiFetch;
