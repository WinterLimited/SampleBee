import {BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";

export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    // 접속 기기 및 경로 통계 시 사용
    // @Column()
    // userAgent: string;
    //
    // @Column()
    // pageUrl: string;
}