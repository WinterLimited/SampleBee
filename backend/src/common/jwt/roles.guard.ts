import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    // Reflector: 메타데이터를 가져오기 위한 도구
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredScopes = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredScopes) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        // user.scope가 문자열이라면, 해당 scope가 필요한 scope 목록에 포함되어 있는지 검사
        return requiredScopes.includes(user.scope);
    }
}
