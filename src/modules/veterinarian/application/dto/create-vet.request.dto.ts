import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsMilitaryTime, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class CreateVetRequestDTO {
    
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    lastname: string;

    @AutoMap()
    @ApiProperty()
    @IsEmail()
    email: string;

    @AutoMap()
    @ApiProperty()
    password: string;

    @AutoMap()
    @ApiProperty()
    @IsPhoneNumber('PE',{message:'PhoneNumber is not in peruvian format'})
    phone: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    clinic_name: string;

    @AutoMap()
    @ApiProperty()
    @IsMilitaryTime()
    disponibility_start: String;

    @AutoMap()
    @ApiProperty()
    @IsMilitaryTime()
    disponibility_end: String;
}