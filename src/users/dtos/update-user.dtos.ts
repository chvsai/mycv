import { IsEmail, IsString, IsOptional} from 'class-validator'

export class UpdateUserDtos{
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}