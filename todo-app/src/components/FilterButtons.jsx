import React from 'react';
import {
    Button,
    ButtonGroup,
} from '@mui/material';

function FilterButtons({ onSetFilter, currentFilter }) {
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
                onClick={() => onSetFilter('all')}
                color={currentFilter === 'all' ? 'secondary' : 'primary'}
            >
                All
            </Button>
            <Button
                onClick={() => onSetFilter('notCompleted')}
                color={currentFilter === 'notCompleted' ? 'secondary' : 'primary'}
            >
                Not Done
            </Button>
            <Button
                onClick={() => onSetFilter('completed')}
                color={currentFilter === 'completed' ? 'secondary' : 'primary'}
            >
                Done
            </Button>
        </ButtonGroup>
    );
}


export default FilterButtons;
