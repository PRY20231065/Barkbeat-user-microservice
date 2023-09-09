import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { VetSchema } from './domain/schema/vet.schema';
import * as fs from 'fs';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';
import { VetController } from './infrastructure/controller/vet.controller';
import { VetImplService } from './application/service/vetImpl.service';
import { VetImplRepository } from './infrastructure/repository/vetImpl.repository';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'veterinarian',
                schema: VetSchema,
            },
        ]),
        JwtModule.registerAsync({
            useFactory: async () => ({
                privateKey: fs.readFileSync(path.resolve(__dirname, '../../keys/private.key')),
                publicKey: fs.readFileSync(path.resolve(__dirname, '../../keys/public.key')),
                signOptions: { algorithm: 'RS256' },
            }),
        }),
    ],
    controllers: [VetController],
    providers: [VetImplService, VetImplRepository],
    exports: [VetImplService]
})
export class VeterinarianModule {}
