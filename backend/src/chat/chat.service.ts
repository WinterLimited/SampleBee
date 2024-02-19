// chat.service.ts
import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
    async runChatScript(question: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const pythonScriptPath = process.env.PYTHON_SCRIPT_PATH;
            const pythonProcess = spawn('python', [pythonScriptPath, question]);

            let result = '';
            pythonProcess.stdout.on('data', (data) => {
                result += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                reject(data.toString());
            });

            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(result);
                } else {
                    reject(`파이썬 스크립트 종료 코드: ${code}`);
                }
            });
        })
    }
}
