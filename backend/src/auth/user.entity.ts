import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserStatus} from "./enums/user-status.enum";
import {UserRole} from "./enums/user-role.enum";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    // providerId는 사용자가 로그인을 제공받은 곳을 나타냅니다.
    @Column()
    providerId: string;

    // oAuth는 사용자가 소셜 로그인을 사용하여 로그인할 때 사용되는 인증 토큰입니다.
    @Column({ nullable: true})
    oAuth: string | null;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    occupation: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
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