import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { CreateOwnerRequestDTO } from 'src/modules/owner/application/dto/create-owner.request.dto';
import { Owner } from 'src/modules/owner/domain/model/owner.model';
import { OwnerRequestDTO } from 'src/modules/owner/application/dto/owner.request.dto';



export const resourceToModel = () => {
    createMap(mapper, CreateOwnerRequestDTO, Owner);
    createMap(mapper, OwnerRequestDTO, Owner);

}
