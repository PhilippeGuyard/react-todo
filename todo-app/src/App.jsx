import React, { useState } from 'react';
import {
  CssBaseline,
} from '@mui/material';
import MainArea from './components/MainArea';
import Header from './components/Header';
import { initialTodos } from './data/initialTodos';

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'notCompleted'

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      dateAdded: new Date().toLocaleDateString("en-GB"), // Format date as DD/MM/YYYY
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <MainArea todos={todos} onAddTodo={addTodo} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} filter={filter} onSetFilter={setFilter} />
    </>
  );
}

export default App;







