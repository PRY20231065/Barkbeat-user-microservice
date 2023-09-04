import { createMap, forMember } from '@automapper/core';
import { mapper } from './mapper';
import { Owner } from 'src/modules/owner/domain/model/owner.model';
import { OwnerResponseDTO } from 'src/modules/owner/application/dto/owner.response.dto';
import { CreateOwnerResposeDTO } from 'src/modules/owner/application/dto/create-owner.response.dto';


export const modelToResource = () =>{
    createMap(mapper, Owner, OwnerResponseDTO);
    createMap(mapper, Owner, CreateOwnerResposeDTO);
   
}
