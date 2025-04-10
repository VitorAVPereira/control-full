import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';
import { ClientesModule } from '../clientes/clientes.module';
import { ServicosModule } from '../servicos/servicos.module';
import { TecnicosModule } from 'src/tecnicos/tecnicos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contrato]),
    ClientesModule,
    ServicosModule,
    TecnicosModule
  ],
  controllers: [ContratosController],
  providers: [ContratosService],
  exports: [TypeOrmModule],
})
export class ContratosModule {}
