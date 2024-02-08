import {Body, Controller, Get, Post, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignInCredentialsDto} from "./dto/sign-in-credentials.dto";
import {SignUpCredentialsDto} from "./dto/sign-up-credentials.dto";

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

    @Get('/check-email')
    checkEmail(@Body('email') email: string): Promise<boolean> {
        return this.authService.checkEmail(email);
    }

    @Post('/delete')
    deleteUser(@Body('id') id: number): Promise<void> {
        return this.authService.deleteUser(id);
    }
}
