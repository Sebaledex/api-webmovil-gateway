import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //Se usa para importar el archivo variables de entorno
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
