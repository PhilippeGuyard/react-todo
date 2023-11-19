import React from 'react';
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const isOverdue = (date) => {
    const today = new Date();
    const dueDate = new Date(date);
    return dueDate < today;
};


function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function ToDoItem({ todo, onToggle, onDelete }) {
    const handleToggle = () => {
        onToggle(todo.id);
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };
    // Check if the todo is overdue and not completed
    const isItemOverdue = !todo.completed && isOverdue(todo.dateAdded);
    console.log(todo);

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            }
            dense
            style={{
                backgroundColor: isItemOverdue ? '#ffcccc' : 'inherit', // Apply a background color if overdue
                marginTop: '2px' // Add a 2px top margin
            }}
        >
            <Checkbox
                edge="start"
                checked={todo.completed}
                onClick={handleToggle}
            />
            <ListItemText
                primary={todo.title}
                secondary={`Added on: ${formatDate(todo.dateAdded)}${isItemOverdue ? ' - Overdue' : ''}`}
                primaryTypographyProps={{ style: { fontSize: '1em' } }}
            />
        </ListItem>
    );
}


export default ToDoItem;