import {IsDate} from "class-validator";

export class VisitRecordDto {

    id: number;

    @IsDate()
    createdAt: Date;
}