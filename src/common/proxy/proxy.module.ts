import { Module } from '@nestjs/common';
import { ClientProxyWebMovil } from './client-proxy';

@Module({
  providers: [ClientProxyWebMovil],
  exports: [ClientProxyWebMovil],
})
export class ProxyModule {}
