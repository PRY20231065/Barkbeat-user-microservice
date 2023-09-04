import { Injectable } from "@nestjs/common";
import { OwnerRepository } from "../domain/interface/owner.repository";
import { Owner, OwnerKey } from "../domain/model/owner.model";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';

@Injectable()
export class OwnerImplRepository implements OwnerRepository {

    constructor(
        @InjectModel('owner')
        private readonly ownerModel: Model<Owner, OwnerKey>) { }

    async findOneByEmailKey(email: string): Promise<Owner> {
        const queryResponse = await this.ownerModel.query('email').eq(email).exec();

        if (queryResponse.count === 0) {
            return null;
        }

        return queryResponse[0];
    }

    async create(owner: Owner): Promise<Owner> {
        const ownerCreated = await this.ownerModel.create({
            ...owner,
            id: uuid.v4(),
        });

        return ownerCreated;
    }

    async update(key: OwnerKey, owner: Partial<Owner>): Promise<Owner> {
        const ownerUpdated = await this.ownerModel.update(key, owner);
        return ownerUpdated;
    }

    async findOne(key: string): Promise<Owner> {
        const owner = await this.ownerModel.get({ id: key });
        return owner;
    }

    async findAll(): Promise<Owner[]> {
        return await this.ownerModel.scan().exec();
    }

}