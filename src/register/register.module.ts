import { ProxyModule } from './../common/proxy/proxy.module';
import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';

@Module({
  imports: [ProxyModule],
  controllers: [RegisterController],
})
export class RegisterModule {}
