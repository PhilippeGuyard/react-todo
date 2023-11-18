
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';


function Header() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    To-Do App
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
