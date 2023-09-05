
import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { VetRepository } from '../domain/interface/vet.repository';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Vet, VetKey } from '../domain/model/vet.model';

@Injectable()
export class VetImplRepository implements VetRepository {

    constructor(
        @InjectModel('veterinarian')
        private readonly vetModel: Model<Vet, VetKey>) { }
    
    async create(vet: Vet): Promise<Vet> {
        const ownerCreated = await this.vetModel.create({
            ...vet,
            id: uuid.v4(),
        });

        return ownerCreated;
    }
    
    async update(key: VetKey, owner: Partial<Vet>): Promise<Vet> {
        const vetUpdated = await this.vetModel.update(key, owner);
        return vetUpdated;
    }
    
    async findOne(key: string): Promise<Vet> {
        const vet = await this.vetModel.get({ id: key });
        return vet;
    }
    
    async findOneByEmailKey(email: string): Promise<Vet> {
        const queryResponse = await this.vetModel.query('email').eq(email).exec();

        if (queryResponse.count === 0) {
            return null;
        }

        return queryResponse[0];
    }
    
    async findAll(): Promise<Vet[]> {
        return await this.vetModel.scan().exec();
    }
}