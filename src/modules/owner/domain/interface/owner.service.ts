import { IGenericResponse } from "src/utils/generic";
import { CreateOwnerRequestDTO } from "../../application/dto/create-owner.request.dto";
import { OwnerResponseDTO } from "../../application/dto/owner.response.dto";
import { CreateOwnerResposeDTO } from "../../application/dto/create-owner.response.dto";
import {  CredentialsResponseDTO } from "../../../auth/dto/credentials.response.dto";
import { CredentialsRequestDTO } from "../../../auth/dto/credentials.request.dto";

export interface OwnerService {
    createOwner(owner: CreateOwnerRequestDTO): Promise<IGenericResponse<CreateOwnerResposeDTO>>;
    aunthenticateOwner(credentials: CredentialsRequestDTO): Promise<IGenericResponse<CredentialsResponseDTO>>
    updateOwnerByKey(key: string, owner: CreateOwnerRequestDTO): Promise<IGenericResponse<OwnerResponseDTO>>;
    findOneOwnerByKey(key: string): Promise<IGenericResponse<OwnerResponseDTO>>;
    findAllOwners(): Promise<OwnerResponseDTO[]>;
}