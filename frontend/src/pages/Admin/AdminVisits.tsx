import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
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

    const fetchVisits = async () => {
        try {
            const response = await axios.get('/api/admin/visit');
            const data: ChartData = processVisitData(response.data.visits);
            setVisitData(data);
        } catch (error) {
            console.error('방문 데이터를 가져오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchVisits();
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

    return (
        <div>
            <h2>방문 기록 그래프</h2>
            <Bar data={visitData} />
        </div>
    );
}

export default AdminVisits;
