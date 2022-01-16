import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: "", title: "" });
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token 5996f3ff9ce3bfbe3e2d37f1ad2a2d2f1f29fe47",
        },
      })
      .then((res) => {
        setTasks(res.data); // Single Page Application
      });
  }, []);

  // READ
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

  // DELETE
  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 5996f3ff9ce3bfbe3e2d37f1ad2a2d2f1f29fe47",
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id)); // 削除したタスク以外を設定
        setSelectedTask([]); // 選択したタスクを初期化
        if (editedTask.id === id) {
          setEditedTask({ id: "", title: "" });
        }
      });
  };

  // CREATE
  const newTask = (task) => {
    const data = {
      title: task.title,
    };

    axios
      .post(`http://127.0.0.1:8000/api/tasks/`, data, {
        headers: {
          "Content-Type": "application/json", // POSTやPUTで値を渡す場合はContent-Typeにapplication/json
          Authorization: "Token 5996f3ff9ce3bfbe3e2d37f1ad2a2d2f1f29fe47",
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]); // Single Page Application
        setEditedTask({ id: "", title: "" });
      });
  };

  // UPDATE
  const editTask = (task) => {
    axios
      .put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task, {
        headers: {
          "Content-Type": "application/json", // POSTやPUTで値を渡す場合はContent-Typeにapplication/json
          Authorization: "Token 5996f3ff9ce3bfbe3e2d37f1ad2a2d2f1f29fe47",
        },
      })
      .then((res) => {
        // Single Page Application
        setTasks(
          tasks.map((task) => (task.id === editedTask.id ? res.data : task))
        );
        setEditedTask({ id: "", title: "" });
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditedTask({ ...editedTask, [name]: value }); // オブジェクトのkeyを変数として扱う場合の記法で、[]の中にkeyの変数を入れることで展開できる
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} id: {task.id}
            <button onClick={() => setEditedTask(task)}>
              <i className="fas fa-pen"></i>
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
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
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={(e) => handleInputChange(e)}
        placeholder="New Task ?"
        required
      />
      {editedTask.id ? (
        <button onClick={() => editTask(editedTask)}>Update</button>
      ) : (
        <button onClick={() => newTask(editedTask)}>Create</button>
      )}
    </div>
  );
};

export default DrfApiFetch;
