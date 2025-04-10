import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnicosService } from './tecnicos.service';
import { TecnicosController } from './tecnicos.controller';
import { Tecnico } from './entities/tecnico.entity';
import { TecnicoServicoCusto } from './entities/tecnico-servico-custo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tecnico, TecnicoServicoCusto])],
  controllers: [TecnicosController],
  providers: [TecnicosService],
  exports: [TypeOrmModule],
})
export class TecnicosModule {}
