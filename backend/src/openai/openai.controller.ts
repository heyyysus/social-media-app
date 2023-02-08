import { Controller, Get } from '@nestjs/common';
import { CreateCompletionResponse } from 'openai';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenAIService) {}
    @Get('test')
    async test(): Promise<CreateCompletionResponse>{
        return this.openaiService.complete_text("Create a username for a social media platform. Return only the username", 10);
    }
}
