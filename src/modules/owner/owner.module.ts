import { OwnerController } from './infrastructure/controller/owner.controller';
import { Module } from '@nestjs/common';
import { OwnerImplService } from './application/service/ownerImpl.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { OwnerSchema } from './domain/schema/owner.schema';
import { OwnerImplRepository } from './infrastructure/ownerImpl.repository';
import * as fs from 'fs';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'owner',
                schema: OwnerSchema,
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
    controllers: [OwnerController],
    providers: [OwnerImplService, OwnerImplRepository],
    exports: [OwnerImplService],
})
export class OwnerModule { }
