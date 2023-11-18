import React from 'react';
import { Container, Grid, useTheme } from '@mui/material';
import AddTodoForm from './AddTodoForm';
import ToDoList from './ToDoList';
import FilterButtons from './FilterButtons';



function MainArea({ todos, onAddTodo, onToggleTodo, onDeleteTodo, filter, onSetFilter }) {
    const theme = useTheme();

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'notCompleted') return !todo.completed;
        return true; // for 'all'
    });

    return (
        <Container style={{ marginTop: theme.spacing(8) }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FilterButtons onSetFilter={onSetFilter} currentFilter={filter} />
                </Grid>
                <Grid item xs={12}>
                    <AddTodoForm onAddTodo={onAddTodo} />
                </Grid>
                <Grid item xs={12}>
                    <ToDoList todos={filteredTodos} onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default MainArea;