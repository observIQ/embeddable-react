import React from "react";

export const Todo = (props) => {
  return (
    <div className="todo">
      <input type={"checkbox"} checked={props.todo.completed} />
      <p>{props.todo.description}</p>
      <button className="delete">Delete</button>
    </div>
  );
};
