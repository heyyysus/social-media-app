import { BadGatewayException, BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthService, AuthToken } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('')
    async GenerateAuthToken(
        @Body() {email, plaintext_password}: { email: string, plaintext_password: string }
    ): Promise<AuthToken> {
        if(!(email && plaintext_password)) throw new BadRequestException();
        const result = this.authService.GenerateAuthToken(email, plaintext_password);
        return result;
    }
}
