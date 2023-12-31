import React from 'react';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

function AddTodoForm({ onAddTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) return;
        onAddTodo(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} role="form">
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    label="Add New Todo"
                    variant="outlined"
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit" aria-label='Add a new todo item'>
                    Add
                </Button>
            </Box>
        </form>
    );
}

export default AddTodoForm;