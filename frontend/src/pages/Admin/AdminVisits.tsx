import React, { useEffect, useState } from 'react';

// import axios
import axios from "../../api/axiosConfig";

import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {SwalAlertCallBack} from "../../components/Common/SwalAlert";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
Chart.register(...registerables);


// 방문 기록 타입 정의
interface Visit {
    id: number;
    createdAt: string;
    pageUrl: string;
    userAgent: string;
}

// 차트 데이터 구조를 위한 인터페이스
interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }[];
}

function AdminVisits() {
    const navigate = useNavigate();
    const [visitData, setVisitData] = useState<ChartData>({ labels: [], datasets: [] });
    const [visits, setVisits] = useState<Visit[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVisits = async () => {
        try {
            const response = await axios.get('/api/admin/visits');
            setVisits(response.data.data);
            const data: ChartData = processVisitData(response.data.data);
            setVisitData(data);
            setLoading(false);
        } catch (error) {
            console.error('방문 데이터를 가져오는 데 실패했습니다:', error);
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
                fetchVisits();
            } else {
                SwalAlertCallBack('error', '관리자만 접근 가능합니다.', '로그인 페이지로 이동합니다.', () => {
                    navigate('/')
                });
            }
        }
    }, []);

    // 방문 데이터를 처리하는 함수
    const processVisitData = (visits: Visit[]): ChartData => {
        const visitCounts: Record<string, number> = {};

        visits.forEach(visit => {
            const date = new Date(visit.createdAt).toLocaleDateString();
            visitCounts[date] = (visitCounts[date] || 0) + 1;
        });

        const labels = Object.keys(visitCounts);
        const data = Object.values(visitCounts);

        return {
            labels,
            datasets: [{
                label: '일일 방문 횟수',
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        };
    };

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
            <Typography variant="h4" component="h3"
                        sx={{
                            color: 'rgb(41, 41, 46)',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            mt: 3,
                            mb: 3
                        }}
            >
                관리자 페이지 - 방문자 기록
            </Typography>
            <Bar data={visitData} />

            {/* 테이블 추가 */}
            <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 1200 }}>
                <Table aria-label="방문 기록 테이블">
                    <TableHead>
                        {/* 총 방문자 수를 표시하는 행 추가 */}
                        <TableRow>
                            <TableCell colSpan={3}>
                                총 방문자 수: {visits.length}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">접속기기</TableCell>
                            <TableCell align="right">방문 시간</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visits && visits.map((visit) => (
                            <TableRow key={visit.id}>
                                <TableCell component="th" scope="row">
                                    {visit.id}
                                </TableCell>
                                <TableCell align="center">{visit.userAgent}</TableCell>
                                <TableCell align="right">{
                                    new Date(visit.createdAt).toLocaleString()
                                }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AdminVisits;
