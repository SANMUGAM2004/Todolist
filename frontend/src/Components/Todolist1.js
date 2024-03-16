import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todolist.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Fetch all Todo items from the backend when the component mounts
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/todo/get');
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/todo/create', { text: inputValue });
        console.log('Todo created successfully:', response.data.message);
        // Fetch updated Todo list after adding a new Todo item
        fetchTodos();
        setInputValue('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      await axios.put(`http://localhost:4000/todo/toggle/${id}`);
      // Fetch updated Todo list after toggling completion status of a Todo item
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  //Handle the delete button
  const handleRemoveTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/delete/${id}`);
      // Fetch updated Todo list after deleting a Todo item
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo._id)}
            />
            <span>{todo.text}</span>
            <button className="delete-btn" onClick={() => handleRemoveTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
