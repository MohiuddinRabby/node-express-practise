import React, { useState, useEffect } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [text, setText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const submit = (e) => {
    e.preventDefault();
    const newTask = text;
    setTask(newTask);
    setText("");
    fetch("http://localhost:3010/addTask", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ newTask }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  useEffect(() => {
    fetch("http://localhost:3010/tasks")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setTaskList(data);
      });
  }, []);
  return (
    <div>
      <h1>React client</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="task name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">send</button>
      </form>
      <div>
        {taskList.map((task) => (
          <li>{task.newTask}</li>
        ))}
      </div>
    </div>
  );
};
export default App;
