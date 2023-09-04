import { AutoMap } from "@automapper/classes";


export class OwnerResponseDTO {
    
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
}