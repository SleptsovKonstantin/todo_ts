import React from "react";
import { ChangeEvent, useState } from "react";

type TodoListProps = {
  addTask(userInput: string): void
}

const TodoForm: React.FC<TodoListProps> = ({ addTask }) => {
  const [userInput, setUserInput] = useState<string>("");

  const taskChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput(String(e.currentTarget.value));
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  const KeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask(userInput);
      setUserInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={userInput}
        type="text"
        onChange={taskChange}
        onKeyDown={KeyPress}
        placeholder="Введите значение.."
      />
      <button>Добавить</button>
    </form>
  );
};

export default TodoForm;
