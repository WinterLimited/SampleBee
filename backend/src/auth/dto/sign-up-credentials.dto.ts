import { IsString, MinLength, MaxLength, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class SignUpCredentialsDto {

    @IsEmail()
    @MinLength(4)
    @MaxLength(20)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    providerId: string;

    @IsString()
    @IsOptional()
    oAuth?: string;

    @IsString()
    @MinLength(10)
    @MaxLength(13)
    phone: string;

    @IsString()
    occupation: string;
}
