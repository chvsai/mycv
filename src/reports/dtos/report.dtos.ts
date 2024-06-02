import { Expose, Transform } from 'class-transformer'

export class reportDto{

    @Expose()
    id: number;
    @Expose()
    price:number;
    @Expose()
    make:string;
    @Expose()
    model:string;
    @Expose()
    year:number;
    @Expose()
    lat:number;
    @Expose()
    lng:number;
    @Expose()
    mileage:number;

    @Transform(({obj}) =>obj.user.id)
    @Expose()
    userID: number;

}