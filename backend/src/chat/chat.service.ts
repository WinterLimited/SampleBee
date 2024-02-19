// chat.service.ts
import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class ChatService {
    async runChatScript(question: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const pythonProcess = spawn('python', ['../../../bot/main.py', question]);

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
                    reject(`Python script exited with code ${code}`);
                }
            });
        })
    }
}
