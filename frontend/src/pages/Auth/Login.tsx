import React, { useState } from 'react';
import {Box, TextField, Button, Typography, Container, FormControl, InputLabel} from '@mui/material';

// import Icon
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// import Alert
import {SwalAlert} from "../../components/Common/SwalAlert";
import {Link} from "react-router-dom";

function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleMenuClick = (page : string) => {
        // 페이지 준비중 문구
        SwalAlert('info', '준비중', '페이지 준비중입니다.');
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 여기에 로그인 처리 로직을 추가합니다.
        console.log("로그인 시도:", id, password);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h6" fontWeight={'bold'}>
                    LOG IN
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate
                     sx={{
                         mt: 7,
                         p: 7,
                         backgroundColor: 'rgb(247, 247, 247)',
                         border: '1px solid rgb(249, 249, 249)',
                         borderRadius: '10px',
                     }}>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="id"
                            sx={{
                                color: 'black',
                                fontSize: '14px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            ID
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            name="id"
                            autoComplete="id"
                            autoFocus
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder={"아이디를 입력해주세요."}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: id === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '250px',
                                    minHeight: '40px',
                                    fontSize: '13px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="password"
                            sx={{
                                color: 'black',
                                fontSize: '14px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            PW
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"비밀번호를 입력해주세요."}
                            InputProps={{
                                sx: {
                                    backgroundColor: 'white',
                                    border: password === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '250px',
                                    minHeight: '40px',
                                    fontSize: '13px',
                                },
                            }}
                        />
                    </FormControl>

                    <Box
                        sx={{
                            // 오른쪽 배치
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            mt: 1,
                            mb: 1,

                            gap: '7%',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(0, 0, 0, 0.54)',
                                fontSize: '12px',
                                cursor: 'pointer',
                            }}
                            onClick = {() => handleMenuClick('findId')}
                        >
                            아이디 찾기
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(0, 0, 0, 0.54)',
                                fontSize: '12px',
                                cursor: 'pointer',
                            }}
                            onClick = {() => handleMenuClick('findPassword')}
                        >
                            비밀번호 찾기
                        </Typography>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: 'rgb(41, 41, 46)',
                            minHeight: '40px',
                            fontWeight: 'bold',

                            '&:hover': {
                                backgroundColor: 'rgba(41, 41, 46, .9)',
                            }

                            // '&:hover': {
                            //     backgroundColor: 'transparent',
                            //     border: '1px solid rgb(41, 41, 46)',
                            //     color: 'rgb(41, 41, 46)',
                            //     boxShadow: 'none',
                            // }
                        }}
                    >
                        LOG IN
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 1,
                            mb: 2,
                            backgroundColor: 'transparent',
                            color : 'rgb(41, 41, 46)',
                            border: '1px solid rgb(41, 41, 46)',
                            minHeight: '40px',
                            fontWeight: 'bold',

                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, .1)',
                            }

                            // '&:hover': {
                            //     backgroundColor: 'rgb(41, 41, 46)',
                            //     color: 'white',
                            // }
                        }}
                        component={Link}
                        to={'/signup'}
                    >
                        SIGN UP <ArrowForwardIosIcon sx={{fontSize: '16px'}}/>
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}

export default Login;
