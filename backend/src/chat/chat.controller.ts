// chat.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('message')
    async sendMessage(@Body('message') message: string) {
        const response = await this.chatService.runChatScript(message);
        return { response };
    }
}