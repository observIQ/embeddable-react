import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { Todo } from "./Todo";

export const Todos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    const resp = await fetch("/api/todos");
    const body = await resp.json();
    const { todos } = body;

    setTodos(todos);
  }, [setTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  function onDeleteSuccess() {
    fetchTodos();
  }

  return (
    <>
      <div className="todos-header">
        <h3>To Do:</h3>
        <button className="plus">+</button>
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onDeleteSuccess={onDeleteSuccess} />
        ))}
      </div>
    </>
  );
};
