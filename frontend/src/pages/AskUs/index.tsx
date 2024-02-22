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
                    샘플비 상담 전문 AI
                </Typography>
                <Typography variant="body1" color={'rgb(41, 41, 46)'} paragraph>
                    샘플비 상담 전문 AI를 통해 견적 및 상담을 받아보세요.
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
