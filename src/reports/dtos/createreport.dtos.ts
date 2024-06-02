import {
IsString,
IsNumber,
Min,
Max
} from 'class-validator'

export class CreateReportDto{

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2999)
    year : number;

    @IsNumber()
    @Min(0)
    @Max(1000000000)
    price: number;

    @IsNumber()
    lat:number;

    @IsNumber()
    lng:number;

    @IsNumber()
    @Min(0)
    @Max(200)
    mileage: number;
}