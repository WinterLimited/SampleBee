import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

// Login 버튼에 Link 적용
import { Link, useNavigate } from 'react-router-dom';

// Alert
import { SwalAlert } from '../Common/SwalAlert';

// Icons
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

// Data
import { Page, pages } from '../../common/data/Header';

function Header() {
    const navigate = useNavigate();
    const [login, setLogin] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<string>('');

    const handleMenuClick = (page: Page) => {
        if(page.name === 'Ask Us') {
            navigate(page.link);
            return;
        }
        // 페이지 준비중 문구
        SwalAlert('info', '준비중', '페이지 준비중입니다.');
    };

    useEffect(() => {
        // 로그인 여부 확인
        // TODO: redux로 변경
        if (localStorage.getItem('user')) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, []);



    return (
        <React.Fragment>
            <AppBar position="fixed"
                    sx={{
                        height: selectedMenu ? '200px' : '64px',
                        backgroundColor: selectedMenu ? 'white' : 'white',
                        boxShadow: 'none',
                        transition: 'height 0.3s',

                        // SwalAlert의 오버레이를 벗어나는 것을 방지
                        zIndex: 1000
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* 로고 및 메뉴 항목 */}
                        <Typography
                            variant="h6"
                            noWrap
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
                            component={Link}
                            to="/"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/logo/horizon_logo1.png`}
                                alt="horizon-logo"
                                style={{ width: '100%' }}
                            />
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => handleMenuClick(page)}
                                    sx={{
                                        color: 'black',
                                        mx: 2,
                                        fontSize: '15px',
                                        textTransform: 'none',
                                        '&:hover': {
                                            fontWeight: 'bold',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 1 }} />

                        {/* 로그인 버튼 오른쪽 배치 */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {
                                // TODO: 수정
                                login ? (
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgb(41, 41, 46)',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        mr: 1,
                                        border: '1px solid white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(41, 41, 46, 0.8)',
                                            border: '1px solid white',
                                        }
                                    }}
                                    component={Link}
                                    to="/logout"
                                >
                                    LOG OUT
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgb(41, 41, 46)',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        mr: 1,
                                        border: '1px solid white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(41, 41, 46, 0.8)',
                                            border: '1px solid white',
                                        }
                                    }}
                                    component={Link}
                                    to="/login"
                                >
                                    LOG IN
                                </Button>
                            )}
                            <Button
                                variant="outlined"
                                sx={{
                                    color: 'black',
                                    backgroundColor: 'rgb(220, 220, 225)',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    p: 0.5,
                                    minWidth: '40px',
                                    border: '1px solid white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(220, 220, 225, 0.8)',
                                        border: '1px solid white',

                                    }
                                }}
                                onClick={() => handleMenuClick({ name: 'Cart', link: '/cart'})}
                            >
                                <ShoppingBagOutlinedIcon />
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* 컨텐츠 렌더링 */}
            <Box sx={{ marginTop: selectedMenu ? '200px' : '64px', transition: 'margin-top 0.3s' }}>
                {selectedMenu && <Typography variant="h4" align="center">{selectedMenu} Content</Typography>}
            </Box>
        </React.Fragment>
    );
}

export default Header;
