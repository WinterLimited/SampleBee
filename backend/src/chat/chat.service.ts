import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class ChatService {
    async runChatScript(question: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const pythonScriptPath = process.env.PYTHON_SCRIPT_PATH;
            if (!pythonScriptPath) {
                reject('Python 스크립트 경로가 설정되지 않았습니다.');
                return;
            }

            const pythonProcess = spawn('python', [pythonScriptPath, question]);

            let result = '';
            pythonProcess.stdout.on('data', (data) => {
                result += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                reject(`Python 스크립트 실행 중 오류 발생: ${data.toString()}`);
            });

            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    try {
                        const parsedResult = JSON.parse(result);
                        // JSON 구조에 따라 접근
                        const content = parsedResult.response.content;
                        resolve(content); // 여기서는 추가 변환 없이 content를 반환
                    } catch (error) {
                        reject(`결과 파싱 중 오류 발생: ${error.toString()}`);
                    }
                } else {
                    reject(`파이썬 스크립트 종료 코드: ${code}`);
                }
            });
        });
    }
}
