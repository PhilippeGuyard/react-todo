import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodoForm from '../../src/components/AddTodoForm';

describe('AddTodoForm Component', () => {
    it('renders input and submit button', () => {
        render(<AddTodoForm onAddTodo={() => { }} />);
        const input = screen.getByLabelText(/add new todo/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        expect(input).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    it('allows typing in the input', () => {
        render(<AddTodoForm onAddTodo={() => { }} />);
        const input = screen.getByLabelText(/add new todo/i);
        fireEvent.change(input, { target: { value: 'New Todo' } });
        expect(input.value).toBe('New Todo');
    });

    it('calls onAddTodo with input value and clears input on form submission', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodoForm onAddTodo={mockAddTodo} />);
        const input = screen.getByLabelText(/add new todo/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
        expect(input.value).toBe('');
    });
});
