import "./TodoForm.css";
import { useState } from 'react';

const TodoForm = () => {

  const [todo, useTodo] = useState('');

  const taskChange = (e: any): void => {
    // console.log(typeof e.currentTarget.value);
    useTodo(todo=> todo = e.currentTarget.value)
    console.log(todo);
  }

  const addTask = () => {
    
  }

  return (
    <div className="TodoForm">
      <input 
        onChange={taskChange}
        type="text" 
        placeholder="Введите значение.."></input>
      <button onClick={addTask}>  Add Task</button> 
    </div>
  );
};

export default TodoForm;
