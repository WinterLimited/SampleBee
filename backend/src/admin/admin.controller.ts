import {Controller, Get, UseGuards} from '@nestjs/common';
import {AdminService} from "./admin.service";
import {JwtAuthGuard} from "../common/jwt/jwt-auth.guard";
import {Roles} from "../common/decorator/roles.decorator";
import {UserRole} from "../auth/enums/user-role.enum";

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('/users')
    // @Roles(UserRole.ADMIN)
    async getAllUsers(): Promise<{ success: boolean; message: string; data?: any[] }> {
        try {
            const users = await this.adminService.getAllUsers();
            return { success: true, message: '사용자 목록 조회 성공', data: users };
        } catch (error) {
            // 에러 처리 로직이 필요할 수 있습니다.
            return { success: false, message: '사용자 목록 조회 실패' };
        }
    }

    @Get('/visits')
    // @Roles(UserRole.ADMIN)
    async getAllVisits(): Promise<{ success: boolean; message: string; data?: any[] }> {
        try {
            const visits = await this.adminService.getAllVisits();
            return { success: true, message: '방문 기록 조회 성공', data: visits };
        } catch (error) {
            // 에러 처리 로직이 필요할 수 있습니다.
            return { success: false, message: '방문 기록 조회 실패' };
        }
    }
}