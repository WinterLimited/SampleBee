import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {SwalAlertCallBack} from "../../components/Common/SwalAlert";

type User = {
    id: string;
    name: string;
    phone: string;
    email: string;
    occupation: string;
}

function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // 관리자 여부 확인
        // TODO: redux로 변경
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if(user.id === 'admin' && user.name == '관리자' && user.email == 'admin@admin') {
            } else {
                SwalAlertCallBack('error', '관리자만 접근 가능합니다.', '로그인 페이지로 이동합니다.', () => {
                    window.location.href = '/';
                });
            }
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users');
                setUsers(response.data.users);
                setLoading(false);
            } catch (error) {
                console.error('사용자 데이터를 가져오는 데 실패했습니다:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <TableContainer component={Paper}>
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
                            <TableCell align="right">{user.name}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                            <TableCell align="right">{user.occupation}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminUsers;
