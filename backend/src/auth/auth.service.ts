import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {SignInCredentialsDto} from './dto/sign-in-credentials.dto';
import {User} from './user.entity';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {SignUpCredentialsDto} from "./dto/sign-up-credentials.dto";
import {UserStatus} from "./enums/user-status.enum";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    // POST /auth/signup
    async signUp(authSignUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        const { email, password, username, providerId, oAuth, phone, occupation } = authSignUpCredentialsDto;

        // Duplicate email check
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new ConflictException('이미 존재하는 계정');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            username,
            providerId,
            oAuth,
            phone,
            occupation
        });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    // POST /auth/signin
    async signIn(authCredentialsDto: SignInCredentialsDto): Promise<{accessToken: string}> {
        const { email, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ email });

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload = {
                iss: 'SampleBee',
                sub: user.id,
                scope: user.role
            };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        }  else {
            throw new UnauthorizedException('로그인 실패');
        }
    }

    // GET /auth/check-email
    async checkEmail(email: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ email });
        return !!user;
    }

    // POST /auth/delete
    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOneBy({id});

        if(!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        }

        user.status = UserStatus.DELETED;

        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

}
