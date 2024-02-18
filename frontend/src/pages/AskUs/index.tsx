// AskUs/index.tsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ChatBox from "./ChatBox";

const AskUs: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h5" component="h2" color={'rgb(41, 41, 46)'} fontWeight={'bold'} gutterBottom>
                    챗봇 상담 서비스
                </Typography>
                <Typography variant="body1" color={'rgb(41, 41, 46)'} paragraph>
                    언제든지 궁금한 점을 물어보세요! 저희 챗봇이 빠르게 답변해 드릴게요.
                </Typography>
                <Box
                    sx={{
                        width: '100%', // 챗봇 컴포넌트의 너비를 조정하려면 이 값을 변경하세요.
                        height: '500px', // 챗봇 컴포넌트의 높이를 조정하려면 이 값을 변경하세요.
                        backgroundColor: '#f5f5f5', // 챗봇 컴포넌트의 배경색을 조정하려면 이 값을 변경하세요.
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                    }}
                >
                    <ChatBox />
                </Box>
            </Box>
        </Container>
    );
};

export default AskUs;
