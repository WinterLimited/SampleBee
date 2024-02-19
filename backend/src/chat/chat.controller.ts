// chat.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('/question')
    async askQuestion(@Body('question') question: string, @Res() res: Response) {
        try {
            const answer = await this.chatService.runChatScript(question);
            res.json({ answer });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}
