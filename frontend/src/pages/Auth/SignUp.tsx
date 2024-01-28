import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';

// Import axios
import axios from '../../api/axiosConfig';

// import Alert
import {SwalAlert} from "../../components/Common/SwalAlert";

function SignUp() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [occupation, setOccupation] = useState('');

    const handleSignUp = () => {

        // Validation
        if (id === '' || name === '' || email === '' || phone === '' || password === '' || confirmPassword === '' || occupation === '') {
            SwalAlert('warning', '입력 오류', '모든 항목을 입력해주세요.');
        } else if (password.length < 8) {
            SwalAlert('warning', '입력 오류', '비밀번호는 8자 이상이어야 합니다.');
        } else if (password !== confirmPassword) {
            SwalAlert('warning', '입력 오류', '비밀번호가 일치하지 않습니다.');
        } else {

            axios.post('/api/auth/signup', {
                id: id,
                name: name,
                email: email,
                phone: phone,
                password: password,
                occupation: occupation,
            }).then((res) => {
                if (res.data.success) {
                    SwalAlert('success', '회원가입 성공', '회원가입이 성공적으로 완료되었습니다.');
                } else {
                    SwalAlert('error', '회원가입 실패', '회원가입에 실패했습니다.');
                }
            }).catch((err) => {
                SwalAlert('error', '회원가입 실패', '회원가입에 실패했습니다.');
            })
        }

    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h6" fontWeight={'bold'}>
                    SIGN UP
                </Typography>
                <Box
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
                            htmlFor="name"
                            sx={{
                                color: 'black',
                                fontSize: '14px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            NAME
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={"이름을 입력해주세요."}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: name === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '250px',
                                    minHeight: '40px',
                                    fontSize: '13px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="email"
                            sx={{
                                color: 'black',
                                fontSize: '14px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            EMAIL
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={"이메일을 입력해주세요."}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: email === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '250px',
                                    minHeight: '40px',
                                    fontSize: '13px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="phone"
                            sx={{
                                color: 'black',
                                fontSize: '14px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            PHONE
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={"전화번호를 하이픈(-)없이 입력해주세요."}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: phone === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
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
                            PASSWORD
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            autoComplete="password"
                            type="password"
                            autoFocus
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"비밀번호를 입력해주세요. (8자리 이상)"}
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

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="passwordCheck"
                            sx={{
                                color: 'black',
                                fontSize: '14px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            PASSWORD CONFIRM
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="passwordCheck"
                            name="passwordCheck"
                            autoComplete="passwordCheck"
                            type="password"
                            autoFocus
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={"비밀번호 다시 입력해주세요. (8자리 이상)"}
                            InputProps={{
                                sx: {
                                    backgroundColor: 'white',
                                    border: confirmPassword === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '250px',
                                    minHeight: '40px',
                                    fontSize: '13px',
                                },
                            }}
                        />
                    </FormControl>


                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="occupation"
                            sx={{
                                color: 'black',
                                fontSize: '14px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            OCCUPATION
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="occupation"
                            name="occupation"
                            autoComplete="occupation"
                            autoFocus
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder={"직업을 입력해주세요. (ex : 학생, 건축가, 인테리어 디자이너, 기타 )"}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: phone === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
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
                            component={Link}
                            to="/login"
                        >
                            이미 회원이신가요?
                        </Typography>
                    </Box>

                    <Button
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
                        onClick={handleSignUp}
                    >
                        SIGN UP
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
