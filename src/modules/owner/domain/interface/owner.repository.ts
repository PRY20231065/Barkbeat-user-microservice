import { Owner, OwnerKey } from "../model/owner.model";

export interface OwnerRepository {
    create(owner: Owner): Promise<Owner>;
    update(key: OwnerKey, owner: Partial<Owner>): Promise<Owner>;
    findOne(key: string): Promise<Owner>;
    findOneByEmailKey(email: string): Promise<Owner>;
    findAll(): Promise<Owner[]>;
}