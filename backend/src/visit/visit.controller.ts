import {Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {VisitService} from "./visit.service";
import {VisitRecordDto} from "./dto/visit-record.dto";

@Controller('visit')
export class VisitController {
    constructor(private visitService: VisitService) {}

    @Post('/record')
    recordVisit(@Body(ValidationPipe) visitRecordDto: VisitRecordDto): Promise<void> {
        return this.visitService.recordVisit(visitRecordDto);
    }

}
