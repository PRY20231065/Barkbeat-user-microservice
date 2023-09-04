import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class OwnerRequestDTO {
    
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
    @IsPhoneNumber('PE',{message:'PhoneNumber is not in peruvian format'})
    phone: string;
}