import { CredentialsResponseDTO } from "src/modules/auth/dto/credentials.response.dto";
import { VetResponseDTO } from "../../application/dto/vet.response.dto";
import { IGenericResponse } from "src/utils/generic";
import { CreateVetResposeDTO } from "../../application/dto/create-vet.response.dto";
import { CredentialsRequestDTO } from "src/modules/auth/dto/credentials.request.dto";
import { CreateVetRequestDTO } from "../../application/dto/create-vet.request.dto";
import { VetRequestDTO } from "../../application/dto/vet.request.dto";

export interface VetService {
    createVet(vet: CreateVetRequestDTO): Promise<IGenericResponse<CreateVetResposeDTO>>;
    aunthenticateVet(credentials: CredentialsRequestDTO): Promise<IGenericResponse<CredentialsResponseDTO>>
    updateVetByKey(key: string, vet: VetRequestDTO): Promise<IGenericResponse<VetResponseDTO>>;
    findOneVetByKey(key: string): Promise<IGenericResponse<VetResponseDTO>>;
    findAllVets(): Promise<VetResponseDTO[]>;
}