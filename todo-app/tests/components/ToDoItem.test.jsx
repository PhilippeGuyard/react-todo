import React from 'react';
// import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import ToDoItem from '../../src/components/ToDoItem';


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
});
