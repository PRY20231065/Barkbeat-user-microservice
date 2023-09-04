import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class CreateOwnerRequestDTO {
    
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
}