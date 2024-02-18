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
                        width: '100%',
                        height: '600px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                    }}
                    mt={2}
                >
                    <ChatBox />
                </Box>
            </Box>
        </Container>
    );
};

export default AskUs;
