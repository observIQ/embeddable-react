import React, { useState } from "react";

export const Todo = (props) => {
  const [completed, setCompleted] = useState(props.todo.completed);
  async function handleCheckClick(e) {
    const payload = {
      completed: e.target.checked,
    };

    const resp = await fetch(`/api/todos/${props.todo.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    const body = await resp.json();
    const { todo } = body;
    setCompleted(todo.completed);
  }
  return (
    <div className="todo">
      <input
        type={"checkbox"}
        checked={completed}
        onChange={handleCheckClick}
      />
      <p>{props.todo.description}</p>
      <button className="delete">Delete</button>
    </div>
  );
};
