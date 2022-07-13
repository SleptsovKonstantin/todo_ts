import React from "react";
import { IMode } from "../../Interfaces/Interfaces";
import { ITask } from "../../Interfaces/Interfaces";

type TodoTaskProps = {
  todo: ITask;
  toogleTask(id: string): void;
  removeTask(id: string): void;
  cancelTask(id: string): void;
  handleEditMode(id: string, task: string): void;
  saveTask(editMode: IMode): void;
  editMode: IMode;
  setEditMode:any;
};

const TodoTask: React.FC<TodoTaskProps> = ({
  todo,
  toogleTask,
  removeTask,
  cancelTask,
  handleEditMode,
  saveTask,
  editMode,
  setEditMode,
}) => {
  const taskChangeNew = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditMode((prev: IMode) => ({ ...prev, currentValue: e.target.value }));
  };

  const KeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      saveTask(editMode);
      setEditMode((editMode.currentValue = ""));
      console.log(editMode);
    }
  };

  return (
    <div key={todo.id} className="item-todo">
      {editMode.on && editMode.id === todo.id ? (
        <div>
          <input
            value={editMode.currentValue}
            type="text"
            onChange={taskChangeNew}
            onKeyDown={KeyPress}
          />
          <button onClick={() => saveTask(editMode)}>SAVE</button>
          <button onClick={() => cancelTask(todo.id)}>CANCEL</button>
        </div>
      ) : (
        <div className="oneTask">
          <div className={todo.complete ? "item_text_comp" : "item_text"}>
            {todo.task}
            <input type="checkbox" onClick={() => toogleTask(todo.id)}></input>
          </div>
          <button className="item-delete" onClick={() => removeTask(todo.id)}>
            DELETE
          </button>
          <button
            className="item-update"
            onClick={() => handleEditMode(todo.id, todo.task)}
          >
            UPDATE
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoTask;
