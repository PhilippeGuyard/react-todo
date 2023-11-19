import React from 'react';
import {
    Button,
    ButtonGroup,
} from '@mui/material';

function FilterButtons({ onSetFilter, currentFilter }) {
    return (
        <ButtonGroup
            variant="contained"
            aria-label="filter button group"
            style={{ marginTop: '8px' }}
        >

            <Button
                aria-pressed={currentFilter === 'all'}
                onClick={() => onSetFilter('all')}
                color={currentFilter === 'all' ? 'secondary' : 'primary'}
            >
                All
            </Button>
            <Button
                aria-pressed={currentFilter === 'not completed todos'}
                onClick={() => onSetFilter('notCompleted')}
                color={currentFilter === 'notCompleted' ? 'secondary' : 'primary'}
            >
                Not Done
            </Button>
            <Button
                aria-pressed={currentFilter === 'completed todos'}
                onClick={() => onSetFilter('completed')}
                color={currentFilter === 'completed' ? 'secondary' : 'primary'}
            >
                Done
            </Button>
        </ButtonGroup>
    );
}


export default FilterButtons;
