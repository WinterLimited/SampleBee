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

    // GET /visit/record
    async getAllVisit(): Promise<{visitRecord: VisitRecordDto[]}> {
        const visitRecord = await this.visitRepository.find();
        const visitRecordDto = visitRecord.map((visit) => {
            const visitRecordDto: VisitRecordDto = {
                id: visit.id,
                userAgent: visit.userAgent,
                pageUrl: visit.pageUrl,
                createdAt: visit.createdAt
            };
            return visitRecordDto;
        });

        return {visitRecord: visitRecordDto};
    }

    // POST /visit/record
    async recordVisit(): Promise<void> {
        const visit = this.visitRepository.create({});
        await this.visitRepository.save(visit);
    }
}
