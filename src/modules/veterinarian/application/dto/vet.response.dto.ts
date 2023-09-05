import { AutoMap } from "@automapper/classes";


export class VetResponseDTO {
    
    @AutoMap()
    id: string;

    @AutoMap()
    name: string;

    @AutoMap()
    lastname: string;

    @AutoMap()
    email: string;

    @AutoMap()
    phone: string;

    @AutoMap()
    clinic_name: string;

    @AutoMap()
    disponibility_start: string;

    @AutoMap()
    disponibility_end: string;
}