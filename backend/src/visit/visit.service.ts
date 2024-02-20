import { Injectable } from '@nestjs/common';
import {Visit} from "./visit.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {VisitRecordDto} from "./dto/visit-record.dto";

@Injectable()
export class VisitService {
    constructor(
        @InjectRepository(Visit)
        private visitRepository: Repository<Visit>
    ) {}

    // POST /visit/record
    async recordVisit(visitRecordDto: VisitRecordDto): Promise<void> {
        const { userAgent, pageUrl } = visitRecordDto;

        const visit = this.visitRepository.create({
            userAgent,
            pageUrl
        });

        await this.visitRepository.save(visit);
    }
}
