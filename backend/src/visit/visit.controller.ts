import {Controller, Get, Post, UseGuards} from '@nestjs/common';
import {VisitService} from "./visit.service";
import {VisitRecordDto} from "./dto/visit-record.dto";
import {JwtAuthGuard} from "../common/jwt/jwt-auth.guard";
import {RolesGuard} from "../common/jwt/roles.guard";
import {Roles} from "../common/decorator/roles.decorator";
import {UserRole} from "../auth/enums/user-role.enum";

@Controller('visit')
export class VisitController {
    constructor(private visitService: VisitService) {}

    @Get('/record')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    getVisitCount(): Promise<{visitRecord: VisitRecordDto[]}> {
        return this.visitService.getAllVisit();
    }

    @Post('/recrod')
    recordVisit() {
        return this.visitService.recordVisit();
    }

}
