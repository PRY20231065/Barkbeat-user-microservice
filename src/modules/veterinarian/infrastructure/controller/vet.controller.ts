import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateVetRequestDTO } from "../../application/dto/create-vet.request.dto";
import { VetRequestDTO } from "../../application/dto/vet.request.dto";
import { VetImplService } from "../../application/service/vetImpl.service";

@ApiTags('vets')
@Controller('vets')
export class VetController {
    constructor(private readonly vetService: VetImplService){}

    @ApiOperation({ summary: 'Obtener un vet por Id' })
    @Get(':id')
    async findOneVetById(@Param('id') id: string){
        return await this.vetService.findOneVetByKey(id);
    }
    
    @ApiOperation({ summary: 'Registrar un vet' })
    @Post()
    async registerAnVet(@Body() vetReq: CreateVetRequestDTO){
        return await this.vetService.createVet(vetReq);
    }

    @ApiOperation({ summary: 'Actualizar un vet' })
    @Put(':id')
    async updateAnVetById(@Param('id') id: string, @Body() vetReq: VetRequestDTO){
        return await this.vetService.updateVetByKey(id, vetReq);
    }

    @ApiOperation({summary: 'Listar todos los vets'})
    @Get()
    async listAllVets(){
        return await this.vetService.findAllVets();
    }
}
