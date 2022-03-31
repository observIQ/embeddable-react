import React, { useState } from "react";
import { useEffect } from "react";

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
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li>{todo.description}</li>
        ))}
      </ul>
    </>
  );
};
