import React, { useEffect, useState } from 'react';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box} from '@mui/material';
import {SwalAlertCallBack} from "../../components/Common/SwalAlert";
import {useNavigate} from "react-router-dom";

// import axios
import axios from "../../api/axiosConfig";

type User = {
    id: string;
    username: string;
    phone: string;
    email: string;
    occupation: string;
}

function AdminUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users');
            setUsers(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('사용자 데이터를 가져오는 데 실패했습니다:', error);
            setLoading(false);
        }
    };

    function parseJwt(token: string) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('JWT 디코드 중 오류 발생:', e);
            return null;
        }
    }

    useEffect(() => {

        // 관리자 여부 확인
        // TODO: redux로 변경
        if (localStorage.getItem('user')) {
            const accessToken = localStorage.getItem('user');

            if(!accessToken) {
                SwalAlertCallBack('error', '관리자만 접근 가능합니다.', '로그인 페이지로 이동합니다.', () => {
                    navigate('/')
                });
                return;
            } else {
                const payload = parseJwt(accessToken);
                if(!payload) {
                    SwalAlertCallBack('error', '관리자만 접근 가능합니다.', '로그인 페이지로 이동합니다.', () => {
                        navigate('/')
                    });
                    return;
                }


                if(payload.scope === 'ROLE_ADMIN') {
                    fetchUsers();
                } else {
                    SwalAlertCallBack('error', '관리자만 접근 가능합니다.', '로그인 페이지로 이동합니다.', () => {
                        navigate('/')
                    });
                }
            }
        } else {
            SwalAlertCallBack('error', '관리자만 접근 가능합니다.', '로그인 페이지로 이동합니다.', () => {
                navigate('/')
            });
        }
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
            }}
        >
            <Typography
                variant="h4"
                component="h3"
                sx={{
                    color: 'rgb(41, 41, 46)',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    mt: 3,
                    mb: 3
                }}
            >
                관리자 페이지 - 사용자 관리
            </Typography>


            <TableContainer component={Paper} sx={{
                width: 1200,
                margin: '0 auto',
                marginTop: '50px',
                marginBottom: '50px'
            }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">이름</TableCell>
                            <TableCell align="right">이메일</TableCell>
                            <TableCell align="right">전화번호</TableCell>
                            <TableCell align="right">직업</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.phone}</TableCell>
                                <TableCell align="right">{user.occupation}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
}

export default AdminUsers;
