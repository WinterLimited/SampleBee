// axiosConfig.ts
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // 서버 주소 - .env 파일에 정의
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((config) => {
    // TODO: 변경
    const token = localStorage.getItem('user');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;