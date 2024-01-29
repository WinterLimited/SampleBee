import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography, Link } from '@mui/material';
import {SwalAlert} from "../Common/SwalAlert";

function Footer() {

    // 페이지 준비중 문구
    const handlePrepare = () => {
        SwalAlert('info', '준비중', '페이지 준비중입니다.');
    };

    return (
        <React.Fragment>
            <AppBar position="static"
                    sx={{
                        height: '110px',
                        backgroundColor: 'rgb(25, 25, 30)',
                        boxShadow: 'none',
                    }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{
                        height: '110px',
                        verticalAlign: 'center',
                        justifyContent: 'space-between',
                        margin: '0 auto',
                    }}>
                        {/* 로고 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
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
                                    src={`${process.env.PUBLIC_URL}/logo/horizon_logo2.png`}
                                    alt="horizon-logo"
                                    style={{ width: '100%' }}
                                />
                            </Typography>
                        </Box>

                        {/* 대표자 정보 */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                color: 'white',
                                paddingRight: '20px',
                            }}
                        >
                            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                                대표자: 채형진<br />
                                전화번호: 010-5503-8718
                            </Typography>
                        </Box>

                        {/* 링크 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link  color="inherit" sx={{ paddingRight: '20px' }} onClick={handlePrepare}>이용약관</Link>
                            <Link  color="inherit" onClick={handlePrepare}>개인정보 처리방침</Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}

export default Footer;
