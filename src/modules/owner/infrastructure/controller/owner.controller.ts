import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OwnerImplService } from '../../application/service/ownerImpl.service';
import { CreateOwnerRequestDTO } from '../../application/dto/create-owner.request.dto';
import { Owner } from '../../domain/model/owner.model';
import { OwnerRequestDTO } from '../../application/dto/owner.request.dto';

@ApiTags('owner')
@Controller('owner')
export class OwnerController {
    constructor(private readonly ownerService: OwnerImplService){}

    @ApiOperation({ summary: 'Obtener un owner por Id' })
    @Get(':id')
    async findOneOwnerById(@Param('id') id: string){
        return await this.ownerService.findOneOwnerByKey(id);
    }
    
    @ApiOperation({ summary: 'Registrar un owner' })
    @Post()
    async registerAnOwner(@Body() ownerReq: CreateOwnerRequestDTO){
        return await this.ownerService.createOwner(ownerReq);
    }

    @ApiOperation({ summary: 'Actualizar un owner' })
    @Put(':id')
    async updateAnOwnerById(@Param('id') id: string, @Body() ownerReq: OwnerRequestDTO){
        return await this.ownerService.updateOwnerByKey(id, ownerReq);
    }

    @ApiOperation({summary: 'Listar todos los owners'})
    @Get()
    async listAllOwners(){
        return await this.ownerService.findAllOwners();
    }
}
