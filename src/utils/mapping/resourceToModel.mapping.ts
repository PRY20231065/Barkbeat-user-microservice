import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { CreateOwnerRequestDTO } from 'src/modules/owner/application/dto/create-owner.request.dto';
import { Owner } from 'src/modules/owner/domain/model/owner.model';
import { OwnerRequestDTO } from 'src/modules/owner/application/dto/owner.request.dto';
import { CreateVetRequestDTO } from 'src/modules/veterinarian/application/dto/create-vet.request.dto';
import { Vet } from 'src/modules/veterinarian/domain/model/vet.model';
import { VetRequestDTO } from 'src/modules/veterinarian/application/dto/vet.request.dto';



export const resourceToModel = () => {
    createMap(mapper, CreateOwnerRequestDTO, Owner);
    createMap(mapper, OwnerRequestDTO, Owner);
    createMap(mapper, CreateVetRequestDTO, Vet);
    createMap(mapper, VetRequestDTO, Vet);
}
