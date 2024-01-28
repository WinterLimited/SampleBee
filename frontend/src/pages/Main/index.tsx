import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Main() {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',  // 세로 중앙 정렬
                alignItems: 'center',  // 가로 중앙 정렬
                backgroundImage: 'url(백그라운드 이미지 경로)',  // 백그라운드 이미지 설정
                backgroundSize: 'cover'  // 백그라운드 이미지 크기 조정
            }}
        >
            <Typography variant="h2" component="h1" sx={{ mb: 3, color: 'white' }}>
                메인 문구
            </Typography>
            <Button variant="contained" size="large">
                버튼 텍스트
            </Button>
        </Box>
    );
}

export default Main;
