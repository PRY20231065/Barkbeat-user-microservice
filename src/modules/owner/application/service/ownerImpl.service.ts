/*
https://docs.nestjs.com/providers#services
*/
import { HttpStatus, Injectable } from '@nestjs/common';
import { OwnerService } from '../../domain/interface/owner.service';
import { Owner, OwnerKey } from '../../domain/model/owner.model';
import { CreateOwnerRequestDTO } from '../dto/create-owner.request.dto';
import * as bcrypt from 'bcrypt';
import { OwnerImplRepository } from '../../infrastructure/ownerImpl.repository';
import { OwnerResponseDTO } from '../dto/owner.response.dto';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { mapper } from 'src/utils/mapping/mapper';
import { IGenericResponse } from 'src/utils/generic';
import { CreateOwnerResposeDTO } from '../dto/create-owner.response.dto';
import { OwnerRequestDTO } from '../dto/owner.request.dto';
import { CredentialsRequestDTO } from '../../../auth/dto/credentials.request.dto';
import { CredentialsResponseDTO } from '../../../auth/dto/credentials.response.dto';
import { JwtService } from '@nestjs/jwt';
import { generateBearerToken } from 'src/utils/functions/generate-tokens';

@Injectable()
export class OwnerImplService implements OwnerService {

    constructor(private readonly ownerRepository: OwnerImplRepository, 
        private jwtService: JwtService){}
    
    
    async aunthenticateOwner(credentials: CredentialsRequestDTO): Promise<IGenericResponse<CredentialsResponseDTO>> {
        try {
            const responseOwner = await this.ownerRepository.findOneByEmailKey(credentials.email); 
            if (!responseOwner) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Owner with email ${credentials.email} not found`
                })
            }

            const verifiedPassword = await bcrypt.compare(credentials.password, responseOwner.password);
            if(!verifiedPassword){
                throw new ErrorManager({
                    type: 'NOT_ACCEPTABLE',
                    message: `Your credentials are incorrect`
                })
            }

            const authResponse: CredentialsResponseDTO = {
                id: responseOwner.id,
                email: responseOwner.email,
                token: await generateBearerToken(this.jwtService)
            }
            
            return {
                success: true,
                data: authResponse,
                messages: ['Successfull authentication'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async createOwner(owner: CreateOwnerRequestDTO): Promise<IGenericResponse<CreateOwnerResposeDTO>> {
        try {
            const ownerModel =  mapper.map(owner, CreateOwnerRequestDTO, Owner);
            ownerModel.password = await bcrypt.hash(ownerModel.password, 10);

            const responseOwner = await this.ownerRepository.create(ownerModel);

            if (!responseOwner) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Owner not was created`
                })
            }

            const mapOwner = mapper.map(responseOwner, Owner, CreateOwnerResposeDTO);
            
            return {
                success: true,
                data: mapOwner,
                messages: ['Owner successfull created'],
                code: HttpStatus.OK
            };

        } catch (error) {
            //console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async updateOwnerByKey(key: string, owner: OwnerRequestDTO): Promise<IGenericResponse<OwnerResponseDTO>> {
        try {
            const findOwner = await this.ownerRepository.findOne(key); 
            if (!findOwner) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Owner with Id '${key}' not found`
                })
            }
          
            const ownerModel =  mapper.map(owner, OwnerRequestDTO, Owner);
            ownerModel.email = findOwner.email;
            ownerModel.password = findOwner.password;
            //Al actualizar no debe ir Id (primary key) en la entidadDto
            const ownerModelUpdated = await this.ownerRepository.update({id:key},ownerModel);
            const mapOwner =  mapper.map(ownerModelUpdated, Owner, OwnerResponseDTO);
            
            return {
                success: true,
                data: mapOwner,
                messages: ['Owner successfull updated'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findOneOwnerByKey(key: string): Promise<IGenericResponse<OwnerResponseDTO>> {
        try {
            const responseOwner = await this.ownerRepository.findOne(key); 
            if (!responseOwner) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Owner with Id ${key} not found`
                })
            }
            const mapOwner = mapper.map(responseOwner, Owner, OwnerResponseDTO);
            
            return {
                success: true,
                data: mapOwner,
                messages: ['Owner successfull founded'],
                code: HttpStatus.OK
            };

        } catch (error) {
            //console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findAllOwners(): Promise<OwnerResponseDTO[]> {
        const responseOwners = await this.ownerRepository.findAll();

        const ownersList = responseOwners.map(responseOwner =>
            mapper.map(responseOwner, Owner, OwnerResponseDTO)
        );

        return ownersList;
    }
    

}
