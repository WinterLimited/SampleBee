import React, { useState, useRef, useEffect } from 'react';
import {Box, Typography, TextField, Button, CircularProgress} from '@mui/material';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const ChatBox: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now(), // Unique ID for each message
            text,
            sender: 'user',
        };

        const botMessage: Message = {
            id: Date.now(),
            text,
            sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setLoading(true);

        // Simulate bot response
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setLoading(false);
        }, 1500);

    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSend = () => {
        sendMessage(inputValue);
        setInputValue(''); // Clear input after sending
    };

    return (
        <Box sx={{ width: '100%', height: '600px', display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {messages.map((message) => (
                    <Box key={message.id} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        margin: '5px 0',
                    }}>
                        <Typography sx={{
                            mb: 1,
                            fontSize: '0.75rem',
                            color: 'rgb(100, 100, 100)',
                        }}>
                            {message.sender === 'user' ? '나' : '샘플비 챗봇'}
                        </Typography>
                        <Typography sx={{
                            backgroundColor: message.sender === 'user' ? 'rgb(255, 212, 31)' : 'rgb(247, 247, 247)',
                            color: 'rgb(41, 41, 46)',
                            borderRadius: '8px',
                            padding: '10px',
                            maxWidth: '80%',
                        }}>
                            {message.text}
                        </Typography>
                    </Box>
                ))}
                {loading && (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-start', // 챗봇 메시지와 같이 왼쪽 정렬
                        margin: '5px 0',
                    }}>
                        <CircularProgress size={20} /> {/* 로딩 크기 조절 */}
                        <Typography sx={{ ml: 2, color: 'rgb(100, 100, 100)', fontSize: '14px' }}>
                            로딩 중...
                        </Typography>
                    </Box>
                )}
                <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ borderTop: '1px solid #e0e0e0', p: 1, display: 'flex', backgroundColor: 'rgb(247, 247, 247)' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="궁금한 점들을 물어보세요!"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    sx={{ mr: 1 }}
                />
                <Button
                    variant="outlined"
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    sx={{
                        backgroundColor: !inputValue.trim() ? 'rgb(249, 249, 249)' : 'rgb(255, 212, 31)',
                        minHeight: '48px',
                        fontWeight: 'bold',
                        color: 'rgb(41, 41, 46)',
                        border: 'none',

                        '&:hover': {
                            backgroundColor: 'rgba(255, 212, 31, .7)',
                            border: 'none',
                        }
                    }}
                >
                    전송
                </Button>
            </Box>
        </Box>
    );
};

export default ChatBox;
