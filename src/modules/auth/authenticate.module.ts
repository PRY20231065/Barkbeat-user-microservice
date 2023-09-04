import { Module } from '@nestjs/common';
import { AuthenticateController } from './auth.controller';
import { OwnerModule } from '../owner/owner.module';

@Module({
    imports: [OwnerModule],
    controllers: [AuthenticateController],
    providers: [],
})
export class AuthenticateModule {}
