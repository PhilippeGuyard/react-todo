import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToDoList from "../../src/components/ToDoList";

describe("ToDoList", () => {
    const mockTodos = [
        { id: 1, title: "Todo 1", completed: false, dateAdded: "2023-11-18" },
        { id: 2, title: "Todo 2", completed: true, dateAdded: "2023-11-17" }
    ];
    const mockOnToggleTodo = jest.fn();
    const mockOnDeleteTodo = jest.fn();

    it("renders correctly", () => {
        render(<ToDoList todos={mockTodos} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} />);
        expect(screen.getByText("Todo 1")).toBeInTheDocument();
        expect(screen.getByText("Todo 2")).toBeInTheDocument();
    });

    it("renders the correct number of ToDoItem components", () => {
        render(<ToDoList todos={mockTodos} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} />);
        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(mockTodos.length);
    });

    it("calls onToggleTodo when a todo item is toggled", () => {
        render(<ToDoList todos={mockTodos} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} />);
        const firstItemCheckbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(firstItemCheckbox);
        expect(mockOnToggleTodo).toHaveBeenCalledWith(mockTodos[0].id);
    });

    it("calls onDeleteTodo when a todo item is deleted", () => {
        render(<ToDoList todos={mockTodos} onToggleTodo={mockOnToggleTodo} onDeleteTodo={mockOnDeleteTodo} />);
        const firstItemDeleteButton = screen.getAllByLabelText("delete")[0];
        fireEvent.click(firstItemDeleteButton);
        expect(mockOnDeleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
    });
});
