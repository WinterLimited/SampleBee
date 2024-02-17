import {BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";

export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userAgent: string;

    @Column()
    pageUrl: string;

    @CreateDateColumn()
    createdAt: Date;
}