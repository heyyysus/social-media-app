import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class OpenAIService {
    private openai_api_configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        organization: "org-Tr3xBxq5NnOcDFs4WGuXj4jE",
    });

    private openai = new OpenAIApi(this.openai_api_configuration);
    
    async complete_text(prompt: string, max_tokens: number, model="text-curie-001", temperature=0.7){
        const compReq: CreateCompletionRequest = {
            model: model, 
            prompt: prompt, 
            temperature: temperature, 
            max_tokens: max_tokens
        };
        const response = await this.openai.createCompletion(compReq);
        return response.data;
    }

    
    
}
