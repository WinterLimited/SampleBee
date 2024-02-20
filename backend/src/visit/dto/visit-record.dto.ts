import {IsOptional, IsString} from "class-validator";

export class VisitRecordDto {
    @IsString()
    userAgent: string;

    @IsString()
    @IsOptional()
    pageUrl: string;
}