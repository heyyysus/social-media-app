import { Controller, Get } from '@nestjs/common';
import { CreateCompletionResponse } from 'openai';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenAIService) {}
    
    
}
