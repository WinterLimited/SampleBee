import {Body, Controller, Delete, Get, Post, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignInCredentialsDto} from "./dto/sign-in-credentials.dto";
import {SignUpCredentialsDto} from "./dto/sign-up-credentials.dto";
import {JwtAuthGuard} from "../common/jwt/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ) {}

    // ValidationPipe: DTO에 정의된 유효성 규칙을 기반으로 요청을 유효성 검사
    @Post('/signup')
    signUp(@Body(ValidationPipe) authSignUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.authService.signUp(authSignUpCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authSignInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authSignInCredentialsDto);
    }

    @Get('/check-email/:email')
    checkEmail(@Request() req): Promise<boolean> {
        const email = req.params.email;
        return this.authService.checkEmail(email);
    }

    @Delete('/delete')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Request() req): Promise<void> {
        const userId = req.user.id;
        return this.authService.deleteUser(userId);
    }
}
