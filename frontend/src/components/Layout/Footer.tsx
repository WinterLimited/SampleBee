import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Footer() {
    return (
        <AppBar position="static" color="primary" style={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    로고
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
