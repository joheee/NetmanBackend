import { Module } from '@nestjs/common';
import { WolModule } from './wol/wol.module';

@Module({
  imports: [WolModule],
})
export class AppModule {}
