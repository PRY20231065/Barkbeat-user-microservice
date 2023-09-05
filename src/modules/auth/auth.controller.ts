import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OwnerImplService } from "../owner/application/service/ownerImpl.service";
import { CredentialsRequestDTO } from "./dto/credentials.request.dto";
import { VetImplService } from "../veterinarian/application/service/vetImpl.service";

@ApiTags('authenticate')
@Controller('authenticate')
export class AuthenticateController {
    constructor(private readonly ownerService: OwnerImplService,
        private readonly vetService: VetImplService){}

    @Post('owner')
    async aunthenticateOwner(@Body() credentials: CredentialsRequestDTO){
        return await this.ownerService.aunthenticateOwner(credentials);
    }

    @Post('veterinarian')
    async aunthenticateVet(@Body() credentials: CredentialsRequestDTO){
        return await this.vetService.aunthenticateVet(credentials);
    }
    
}