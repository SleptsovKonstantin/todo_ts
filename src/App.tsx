import React from 'react';
import './App.css';

import TodoForm from './components/TodoForm/TodoForm';
import TodoTask from './components/TodoTask/TodoTask';

function App() {
  return (
    <div className="App">
      <header>
        <h1>TODO-LIST</h1>
      </header>
      <TodoForm />
      <TodoTask />
    </div>
  );
}

export default App;
