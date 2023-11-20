import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterButtons from '../../src/components/FilterButtons';

describe('FilterButtons Component', () => {
    const mockSetFilter = jest.fn();

    it('renders three filter buttons', () => {
        render(<FilterButtons onSetFilter={mockSetFilter} currentFilter="all" />);
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(3);
    });

    it('highlights the "All" button when currentFilter is "all"', () => {
        render(<FilterButtons onSetFilter={mockSetFilter} currentFilter="all" />);
        const allButton = screen.getByText('All');
        expect(allButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('highlights the "Not Done" button when currentFilter is "notCompleted"', () => {
        render(<FilterButtons onSetFilter={mockSetFilter} currentFilter="notCompleted" />);
        const notDoneButton = screen.getByText('Not Done');
        expect(notDoneButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('highlights the "Done" button when currentFilter is "completed"', () => {
        render(<FilterButtons onSetFilter={mockSetFilter} currentFilter="completed" />);
        const doneButton = screen.getByText('Done');
        expect(doneButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('calls onSetFilter with "notCompleted" when the "Not Done" button is clicked', () => {
        render(<FilterButtons onSetFilter={mockSetFilter} currentFilter="all" />);
        const notDoneButton = screen.getByText('Not Done');
        fireEvent.click(notDoneButton);
        expect(mockSetFilter).toHaveBeenCalledWith('notCompleted');
    });


    it('calls onSetFilter with "completed" when the "Done" button is clicked', () => {
        render(<FilterButtons onSetFilter={mockSetFilter} currentFilter="notCompleted" />);
        const doneButton = screen.getByText('Done');
        fireEvent.click(doneButton);
        expect(mockSetFilter).toHaveBeenCalledWith('completed');
    });
});
