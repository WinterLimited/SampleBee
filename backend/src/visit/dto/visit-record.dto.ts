import {IsDate, IsOptional, IsString} from "class-validator";

export class VisitRecordDto {

    id: number;

    @IsString()
    userAgent: string;

    @IsString()
    @IsOptional()
    pageUrl: string;

    @IsDate()
    createdAt: Date;
}