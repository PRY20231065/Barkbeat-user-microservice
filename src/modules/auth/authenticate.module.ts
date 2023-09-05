import { Module } from '@nestjs/common';
import { AuthenticateController } from './auth.controller';
import { OwnerModule } from '../owner/owner.module';
import { VeterinarianModule } from '../veterinarian/veterinarian.module';

@Module({
    imports: [OwnerModule, VeterinarianModule],
    controllers: [AuthenticateController],
    providers: [],
})
export class AuthenticateModule {}
