import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
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