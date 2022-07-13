import { useState, useEffect } from "react";
import "./App.scss";
import TodoTask from "./components/TodoTask/TodoTask";
import TodoForm from "./components/TodoForm/TodoForm";
import { ITask } from "./Interfaces/Interfaces";
import { IMode } from "./Interfaces/Interfaces";


const App: React.FC = () => {
  const [editMode, setEditMode] = useState<IMode>({
    on: false,
    id: "",
    currentValue: "",
  });

  const [todos, setTodos] = useState<ITask[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]") as ITask[];
    setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (userInput: string): void => {
    if (userInput) {
      const newItem: ITask = {
        id: Math.random().toString(36).substring(2, 9),
        task: userInput,
        complete: false,
      };
      setTodos((prev) => [newItem, ...prev]);
    }
  };

  const removeTask = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const handleEditMode = (id: string, task: string): void => {
    setEditMode((prev) => ({ ...prev, id, on: true, currentValue: task }));
  };

  const cancelTask = (id: string): void => {
    setEditMode((prev) => ({ ...prev, id, on: false }));
  };

  const saveTask = (editMode: IMode): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === editMode.id
          ? { ...todo, task: editMode.currentValue }
          : todo
      )
    );
    cancelTask(editMode.id);
    setEditMode((prev) => ({
      ...prev,
      id: "",
      oldValue: "",
      currentValue: "",
    }));
  };

  return (
    <div className="App">
      <header>
        <h1> my Todo list </h1>
      </header>

      <TodoForm addTask={addTask} />

      <div className="item-list">
        {todos.map((todo: ITask) => {
          return (
            <TodoTask
              key={todo.id}
              todo={todo}
              editMode={editMode}
              setEditMode={setEditMode}
              handleEditMode={handleEditMode}
              saveTask={saveTask}
              cancelTask={cancelTask}
              toogleTask={handleToggle}
              removeTask={removeTask}
            />
          );
        })}
      </div>

      <div>
        <h6>Кол-во задач: {todos.length}</h6>
      </div>
    </div>
  );
};

export default App;
