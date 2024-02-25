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

            const pythonProcess = spawn('python3', [pythonScriptPath, question]);
            let result = '';

            pythonProcess.stdout.on('data', (data) => {
                result += data.toString();
            });

            let errorOutput = '';
            pythonProcess.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(result);
                } else {
                    // 필터링 로직을 추가하여 특정 경고를 무시
                    const filteredErrors = errorOutput.split('\n').filter(line => !line.includes('LangChainDeprecationWarning'));
                    if (filteredErrors.length > 0) {
                        reject(`Python 스크립트 실행 중 오류 발생: ${filteredErrors.join('\n')}`);
                    } else {
                        resolve(result);
                    }
                }
            });
        });
    }
}
