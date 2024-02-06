import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";
import {UserStatus} from "./enums/user-status.enum";
import {UserRole} from "./enums/user-role.enum";

export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    // providerId는 사용자가 로그인을 제공받은 곳을 나타냅니다.
    @Column()
    providerId: string;

    // oAuth는 사용자가 소셜 로그인을 사용하여 로그인할 때 사용되는 인증 토큰입니다.
    @Column()
    oAuth: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    occupation: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    bannedAt: Date | null;

    @Column({
        type: "enum",
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

}