import { AutoMap } from "@automapper/classes";

export class OwnerKey {
  @AutoMap()
  id: string;
}


export class Owner extends OwnerKey {
  @AutoMap()
  name: string;
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;
  @AutoMap()
  lastname: string;
  @AutoMap()
  phone: string;
}