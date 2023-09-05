import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class CreateVetResposeDTO {

    @AutoMap()
    id: string;
    
    @AutoMap()
    name: string;

    @AutoMap()
    lastname: string;

    @AutoMap()
    email: string;

    @AutoMap()
    password: string;

    @AutoMap()
    phone: string;

    @AutoMap()
    clinic_name: string;

    @AutoMap()
    disponibility_start: String;

    @AutoMap()
    disponibility_end: String;
}