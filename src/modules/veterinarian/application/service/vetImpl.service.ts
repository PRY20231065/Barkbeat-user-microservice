import { HttpStatus, Injectable } from "@nestjs/common";
import { VetService } from "../../domain/interface/vet.service";
import { VetImplRepository } from "../../infrastructure/repository/vetImpl.repository";
import { JwtService } from "@nestjs/jwt";
import { CredentialsRequestDTO } from "src/modules/auth/dto/credentials.request.dto";
import { CredentialsResponseDTO } from "src/modules/auth/dto/credentials.response.dto";
import { IGenericResponse } from "src/utils/generic";
import { CreateVetRequestDTO } from "../dto/create-vet.request.dto";
import { CreateVetResposeDTO } from "../dto/create-vet.response.dto";
import { VetResponseDTO } from "../dto/vet.response.dto";
import { VetRequestDTO } from "../dto/vet.request.dto";
import { mapper } from "src/utils/mapping/mapper";
import { Vet } from "../../domain/model/vet.model";
import * as bcrypt from 'bcrypt';
import { ErrorManager } from "src/utils/errors/error.manager";
import { generateBearerToken } from "src/utils/functions/generate-tokens";

@Injectable()
export class VetImplService implements VetService {

    constructor(private readonly vetRepository: VetImplRepository, 
        private jwtService: JwtService){}


    async createVet(vet: CreateVetRequestDTO): Promise<IGenericResponse<CreateVetResposeDTO>> {
        try {
            const vetModel =  mapper.map(vet, CreateVetRequestDTO, Vet);
            vetModel.password = await bcrypt.hash(vetModel.password, 10);

            const responseVet = await this.vetRepository.create(vetModel);

            if (!responseVet) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Veterinarian not was created`
                })
            }

            const mapVet = mapper.map(responseVet, Vet, CreateVetResposeDTO);
            
            return {
                success: true,
                data: mapVet,
                messages: ['Vet successfull created'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async aunthenticateVet(credentials: CredentialsRequestDTO): Promise<IGenericResponse<CredentialsResponseDTO>> {
        try {
            const responseVet = await this.vetRepository.findOneByEmailKey(credentials.email); 
            if (!responseVet) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Vet with email ${credentials.email} not found`
                })
            }

            const verifiedPassword = await bcrypt.compare(credentials.password, responseVet.password);
            if(!verifiedPassword){
                throw new ErrorManager({
                    type: 'NOT_ACCEPTABLE',
                    message: `Your credentials are incorrect`
                })
            }

            const authResponse: CredentialsResponseDTO = {
                id: responseVet.id,
                email: responseVet.email,
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
    
    async updateVetByKey(key: string, vet: VetRequestDTO): Promise<IGenericResponse<VetResponseDTO>> {
        try {
            const findVet = await this.vetRepository.findOne(key); 
            if (!findVet) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Vet with Id '${key}' not found`
                })
            }
          
            const vetModel =  mapper.map(vet, VetRequestDTO, Vet);
            vetModel.email = findVet.email;
            vetModel.password = findVet.password;
            //Al actualizar no debe ir Id (primary key) en la entidadDto
            const ownerModelUpdated = await this.vetRepository.update({id:key},vetModel);
            const mapVet =  mapper.map(ownerModelUpdated, Vet, VetResponseDTO);
            
            return {
                success: true,
                data: mapVet,
                messages: ['Vet successfull updated'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findOneVetByKey(key: string): Promise<IGenericResponse<VetResponseDTO>> {
        try {
            const responseVet = await this.vetRepository.findOne(key); 
            if (!responseVet) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Vet with Id ${key} not found`
                })
            }
            const mapVet = mapper.map(responseVet, Vet, VetResponseDTO);
            
            return {
                success: true,
                data: mapVet,
                messages: ['Vet successfull founded'],
                code: HttpStatus.OK
            };

        } catch (error) {
            //console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findAllVets(): Promise<VetResponseDTO[]> {
        const responseVets = await this.vetRepository.findAll();

        const ownersList = responseVets.map(responseVet =>
            mapper.map(responseVet, Vet, VetResponseDTO)
        );

        return ownersList;
    }
}