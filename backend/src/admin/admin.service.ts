import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../auth/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {Visit} from "../visit/visit.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Visit)
        private visitRepository: Repository<Visit>,
        private jwtService: JwtService
    ) {}


    async getAllUsers() {
        return await this.userRepository.find();
    }

    async getAllVisits() {
        return await this.visitRepository.find();
    }

}
