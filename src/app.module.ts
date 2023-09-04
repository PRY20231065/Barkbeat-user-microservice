import { VeterinarianModule } from './modules/veterinarian/veterinarian.module';
import { OwnerModule } from './modules/owner/owner.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ApiTokenCheckMiddleware } from './common/middleware/apitokencheck.middleware';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthenticateModule } from './modules/auth/authenticate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    VeterinarianModule,
    OwnerModule,
    AuthenticateModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
