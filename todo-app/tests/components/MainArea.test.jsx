import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainArea from '../../src/components/MainArea';

describe('MainArea Component', () => {
    const mockTodos = [
        { id: 1, title: "Todo 1", dateAdded: "2023-11-15", completed: true },
        { id: 2, title: "Todo 2", dateAdded: "2023-11-16", completed: false },
        { id: 3, title: "Todo 3", dateAdded: "2023-11-17", completed: false }
    ];
    const mockOnAddTodo = jest.fn();
    const mockOnToggleTodo = jest.fn();
    const mockOnDeleteTodo = jest.fn();
    const mockOnSetFilter = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<MainArea todos={mockTodos} onAddTodo={mockOnAddTodo} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} filter="all" onSetFilter={mockOnSetFilter} />);
        const input = screen.getByLabelText(/add new todo/i);
        expect(input).toBeInTheDocument();
        expect(screen.getByText(/all/i)).toBeInTheDocument();
        const doneElements = screen.getAllByText(/Done/i);
        const doneButton = doneElements.find(element => element.textContent === 'Done');
        expect(doneButton).toBeInTheDocument();
        const notDoneButton = doneElements.find(element => element.textContent === 'Not Done');
        expect(notDoneButton).toBeInTheDocument();

        mockTodos.forEach(todo => {
            const todoElement = screen.getByText(todo.title, { selector: 'span.MuiTypography-body2.MuiListItemText-primary' });
            expect(todoElement).toBeInTheDocument();
        });

    });

    it('calls onSetFilter when a filter button is clicked', () => {
        render(<MainArea todos={mockTodos} onAddTodo={mockOnAddTodo} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} filter="all" onSetFilter={mockOnSetFilter} />);
        const allButton = screen.getByRole('button', { name: /all/i });
        fireEvent.click(allButton);
        expect(mockOnSetFilter).toHaveBeenCalledWith('all');
    });

    it('calls onAddTodo when a new todo is submitted', () => {
        render(<MainArea todos={mockTodos} onAddTodo={mockOnAddTodo} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} filter="all" onSetFilter={mockOnSetFilter} />);
        const input = screen.getByLabelText(/add new todo/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        expect(mockOnAddTodo).toHaveBeenCalledWith('New Todo');
    });

    it('displays the correct todos based on the filter', () => {
        // Test for 'all' filter
        render(<MainArea todos={mockTodos} onAddTodo={mockOnAddTodo} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} filter="all" onSetFilter={mockOnSetFilter} />);
        mockTodos.forEach(todo => {
            const todoElements = screen.getAllByText(new RegExp(todo.title, 'i'));
            const todoElement = todoElements.find(element => element.textContent === todo.title);
            expect(todoElement).toBeInTheDocument();
        });

        // Test for 'completed' filter
        render(<MainArea todos={mockTodos} onAddTodo={mockOnAddTodo} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} filter="completed" onSetFilter={mockOnSetFilter} />);
        mockTodos.filter(todo => todo.completed).forEach(todo => {
            const todoElements = screen.getAllByText(new RegExp(todo.title, 'i'));
            const todoElement = todoElements.find(element => element.textContent === todo.title);
            expect(todoElement).toBeInTheDocument();
        });

        // Test for 'notCompleted' filter
        render(<MainArea todos={mockTodos} onAddTodo={mockOnAddTodo} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} filter="notCompleted" onSetFilter={mockOnSetFilter} />);
        mockTodos.filter(todo => !todo.completed).forEach(todo => {
            const todoElements = screen.getAllByText(new RegExp(todo.title, 'i'));
            const todoElement = todoElements.find(element => element.textContent === todo.title);
            expect(todoElement).toBeInTheDocument();
        });
    });

});
