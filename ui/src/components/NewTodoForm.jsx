import React, { useState } from "react";

export const NewTodoInput = (props) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");

  async function handleSave() {
    const payload = {
      description: value,
    };

    const resp = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const body = await resp.json();
    console.log({ body });

    props.onCreateSuccess(body.todo);
    setShowInput(false);
  }

  return showInput ? (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="To do..."
      />
      <button onClick={handleSave}>Save</button>
    </div>
  ) : (
    <div>
      <button onClick={() => setShowInput(true)}>New</button>
    </div>
  );
};
