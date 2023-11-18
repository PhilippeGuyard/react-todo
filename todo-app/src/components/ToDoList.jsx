import React from "react";
import { List } from "@mui/material";
import ToDoItem from "./ToDoItem";


function ToDoList({ todos, onToggleTodo, onDeleteTodo }) {
    return (
        <List>
            {todos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
            ))}
        </List>
    );
}

export default ToDoList;

