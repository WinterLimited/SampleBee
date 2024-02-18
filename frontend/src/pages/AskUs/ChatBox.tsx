// ChatBox.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const ChatBox: React.FC = () => {
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
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // Here you would call your bot service to get a response
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSend = () => {
        sendMessage(inputValue);
        setInputValue(''); // Clear input after sending
    };

    return (
        <Box sx={{ width: '100%', height: '500px', overflowY: 'auto', p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            {messages.map((message) => (
                <Typography key={message.id} sx={{ alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: message.sender === 'user' ? '#blue' : '#ddd', color: message.sender === 'user' ? 'white' : 'black', borderRadius: '20px', padding: '10px', margin: '5px', maxWidth: '80%' }}>
                    {message.text}
                </Typography>
            ))}
            <div ref={messagesEndRef} />
            <Box sx={{ display: 'flex', mt: 'auto' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} sx={{ ml: 1 }}>Send</Button>
            </Box>
        </Box>
    );
};

export default ChatBox;
