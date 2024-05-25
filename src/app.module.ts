import { Module } from '@nestjs/common';
import { WolModule } from './wol/wol.module';

@Module({
  imports: [WolModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
