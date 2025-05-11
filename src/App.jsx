import React, { useState, useEffect } from 'react';
import ToDoInput from './components/ToDoInput';
import ToDoList from './components/ToDoList';

function App() {

  const [ todos, setTodos ] = useState([]);
  const [ todoValue, setTodoValue ] = useState("");

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({todos: 
      newList
    }))
  }

  function handleAddTodos (newTodo) {
    const newTodoList = [...todos, newTodo];
    setTodos(newTodoList);
    persistData(newTodoList)
  }

  function handleDeleteTodo (index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    setTodos(newTodoList);
    persistData(newTodoList)
  }

  function handleEditTodo (index){
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if(!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos');
    if (!localTodos) {
      return
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);

  }, [])

  return (
    <>
      <ToDoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue} />
      <ToDoList handleDeleteTodo={handleDeleteTodo} todoValue={todoValue} setTodoValue={setTodoValue} handleEditTodo={handleEditTodo}
      todos={todos}/>
    </>
  )
}

export default App
