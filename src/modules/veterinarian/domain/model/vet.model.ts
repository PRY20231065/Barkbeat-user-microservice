import { AutoMap } from "@automapper/classes";

export class VetKey {
    @AutoMap()
    id: string;
}


export class Vet extends VetKey {
   
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
    disponibility_start: string;

    @AutoMap()
    disponibility_end: string;
}