import { Vet, VetKey } from "../model/vet.model";

export interface VetRepository {
    create(vet: Vet): Promise<Vet>;
    update(key: VetKey, owner: Partial<Vet>): Promise<Vet>;
    findOne(key: string): Promise<Vet>;
    findOneByEmailKey(email: string): Promise<Vet>;
    findAll(): Promise<Vet[]>;
}