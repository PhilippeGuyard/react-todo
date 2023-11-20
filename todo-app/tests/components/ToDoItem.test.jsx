import React from 'react';
// import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import ToDoItem from '../../src/components/ToDoItem';
import { isOverdue, formatDate } from '../../src/components/ToDoItem';
import TodoList from '../../src/components/TodoList';


describe('ToDoItem Component', () => {
    // Mock todo item
    const mockTodo = {
        id: 1,
        title: 'Test Todo',
        dateAdded: '2023-01-01',
        completed: false
    };

    // Mock handlers
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();

    it('renders ToDoItem with correct data', () => {
        render(<ToDoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByText(/Added on: 01\/01\/2023/)).toBeInTheDocument();
    });

    it('applies overdue styling if the todo is overdue and not completed', () => {
        const overdueTodo = { ...mockTodo, dateAdded: '2020-01-01' }; // an overdue date
        render(<ToDoItem todo={overdueTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        const listItem = screen.getByText('Test Todo').closest('li');
        expect(listItem).toHaveStyle('backgroundColor: #ffcccc');
    });

    it('does not apply overdue styling if the todo is completed', () => {
        const completedTodo = { ...mockTodo, completed: true, dateAdded: '2020-01-01' };
        render(<ToDoItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        const listItem = screen.getByText('Test Todo').closest('li');
        expect(listItem).not.toHaveStyle('backgroundColor: #ffcccc');
    });

    it('calls onToggle when the checkbox is clicked', () => {
        render(<ToDoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        fireEvent.click(screen.getByRole('checkbox'));
        expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
    });

    it('calls onDelete when the delete button is clicked', () => {
        render(<ToDoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        fireEvent.click(screen.getByLabelText('delete'));
        expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
    });

    it('displays dates in the correct format', () => {
        const mockTodos = [
            { id: 1, title: 'Todo 1', dateAdded: '2023-01-01', completed: false },
            { id: 2, title: 'Todo 2', dateAdded: '2023-02-01', completed: false }
        ];

        render(<TodoList todos={mockTodos} />);

        mockTodos.forEach(todo => {
            const formattedDate = formatDate(todo.dateAdded); // Assuming formatDate is your date formatting function
            const dateElement = screen.getByText(new RegExp(`Added on: ${formattedDate}`));
            expect(dateElement).toBeInTheDocument();
        });
    });
});

describe('isOverdue Function', () => {
    it('returns true for a past date', () => {
        const pastDate = '2020-01-01'; // An example past date
        expect(isOverdue(pastDate)).toBe(true);
    });

    it('returns false for today\'s date', () => {
        const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
        expect(isOverdue(today)).toBe(false);
    });

    it('returns false for a future date', () => {
        const futureDate = '2030-01-01'; // An example future date
        expect(isOverdue(futureDate)).toBe(false);
    });
});

describe('formatDate Function', () => {
    it('correctly formats a valid date string', () => {
        const inputDate = '2023-11-18';
        const expectedOutput = '18/11/2023';
        expect(formatDate(inputDate)).toBe(expectedOutput);
    });

    it('handles an invalid date string', () => {
        const invalidDate = 'invalid-date';
        const expectedOutput = 'Invalid Date';
        expect(formatDate(invalidDate)).toBe(expectedOutput);
    });
});
