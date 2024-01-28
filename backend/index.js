"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// PostgreSQL 데이터베이스 설정
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// POST /api/auth/signup
app.post('/api/auth/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, phone, password, occupation } = req.body;
    // 유효성 검사
    if (!id || !name || !email || !phone || !password || !occupation) {
        return res.status(400).json({ success: false, message: '모든 필드를 채워주세요.' });
    }
    try {
        // 회원가입 로직: 데이터베이스에 사용자 정보 저장
        const result = yield pool.query('INSERT INTO users (id, name, email, phone, password, occupation) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, email, phone, password, occupation]);
        res.status(200).json({ success: true, message: '회원가입 성공' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
}));
// React 앱 서비스
// 정적 파일 제공 설정 추가
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/build')));
// 모든 GET 요청에 대해 React 앱 서비스
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../frontend/build', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
