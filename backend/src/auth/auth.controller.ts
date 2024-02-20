import { Body, Controller, Delete, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { SignInCredentialsDto } from "./dto/sign-in-credentials.dto";
import { SignUpCredentialsDto } from "./dto/sign-up-credentials.dto";
import { JwtAuthGuard } from "../common/jwt/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authSignUpCredentialsDto: SignUpCredentialsDto): Promise<{ success: boolean, message: string }> {
        await this.authService.signUp(authSignUpCredentialsDto);
        return { success: true, message: '회원가입 성공' };
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authSignInCredentialsDto: SignInCredentialsDto): Promise<{ success: boolean, message: string, accessToken: string }> {
        const { accessToken } = await this.authService.signIn(authSignInCredentialsDto);
        return { success: true, message: '로그인 성공', accessToken };
    }

    @Get('/check-email/:email')
    async checkEmail(@Request() req): Promise<{ success: boolean, message: string }> {
        const email = req.params.email;
        const emailCheck = await this.authService.checkEmail(email);
        return emailCheck ?
            { success: false, message: '이미 존재하는 이메일입니다.'} :
            { success: true, message: '사용 가능한 이메일입니다.'};
    }

    @Delete('/delete')
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Request() req): Promise<{ success: boolean, message: string }> {
        await this.authService.deleteUser(req.user.id);
        return { success: true, message: '계정 삭제 성공' };
    }
}
