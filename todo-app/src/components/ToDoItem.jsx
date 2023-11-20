import React from 'react';
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const isOverdue = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0); // Set to start of due date

    return dueDate < today;
};

export function formatDate(dateString) {
    if (!dateString || isNaN(Date.parse(dateString))) {
        return "Invalid Date";
    }

    const [year, month, day] = dateString.split('-');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
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