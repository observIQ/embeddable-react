import React, { useState } from "react";
import { useEffect } from "react";
import { Todo } from "./Todo";

export const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const resp = await fetch("/api/todos");
      const body = await resp.json();
      const { todos } = body;

      setTodos(todos);
    }

    fetchTodos();
  }, []);

  console.log({ todos });
  return (
    <>
      <div className="todos-header">
        <h3>To Do:</h3>
        <button className="plus">+</button>
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
};
