import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, AuthToken } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('')
    async GenerateAuthToken(
        @Body() {email, plaintext_password}: { email: string, plaintext_password: string }
    ): Promise<AuthToken | string> {
        return this.authService.GenerateAuthToken(email, plaintext_password);
    }
}
