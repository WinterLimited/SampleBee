import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {SwalAlertCallBack} from "../../components/Common/SwalAlert";
import {Box, Typography} from "@mui/material";
Chart.register(...registerables);

// 방문 기록 타입 정의
interface Visit {
    id: number;
    visit_time: string;
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
    const [visitData, setVisitData] = useState<ChartData>({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);

    const fetchVisits = async () => {
        try {
            const response = await axios.get('/api/admin/visit');
            const data: ChartData = processVisitData(response.data.visits);
            setVisitData(data);
            setLoading(false);
        } catch (error) {
            console.error('방문 데이터를 가져오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {

        // 관리자 여부 확인
        // TODO: redux로 변경
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if(user.id === 'admin' && user.name == '관리자' && user.email == 'admin@admin') {
                fetchVisits();
            } else {
                SwalAlertCallBack('error', '관리자만 접근 가능합니다.', '로그인 페이지로 이동합니다.', () => {
                    window.location.href = '/';
                });
            }
        } else {
            SwalAlertCallBack('error', '관리자만 접근 가능합니다.', '로그인 페이지로 이동합니다.', () => {
                window.location.href = '/';
            });
        }
    }, []);

    // 방문 데이터를 처리하는 함수
    const processVisitData = (visits: Visit[]): ChartData => {
        const visitCounts: Record<string, number> = {};

        visits.forEach(visit => {
            const date = new Date(visit.visit_time).toLocaleDateString();
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
                관리자 페이지 - 방문자 기록
            </Typography>
            <Bar data={visitData} />
        </Box>
    );
}

export default AdminVisits;
