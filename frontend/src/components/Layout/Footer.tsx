import React from 'react';
import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material';
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

function Footer() {
    return (
        <React.Fragment>
            <AppBar position="static" color="primary"
                    sx={{
                        height: '110px',
                        backgroundColor: 'rgb(25, 25, 30)',
                        boxShadow: 'none',
                    }}>
                <Container maxWidth="xl" sx={{height: '100%'}}>
                    <Toolbar disableGutters sx={{height: '100%'}}>
                        {/* 로고 및 메뉴 항목 */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                maxWidth: '175px',
                            }}
                        >
                            <img
                                src={"logo/horizon_logo2.png"}
                                alt="horizon-logo"
                                style={{ width: '100%' }}
                            />
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}

export default Footer;
