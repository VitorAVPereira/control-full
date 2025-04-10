import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Custo } from './entities/custo.entity';
import { CustosController } from './custos.controller';
import { CustosService } from './custos.service';
import { ClientesModule } from 'src/clientes/clientes.module';
import { TecnicosModule } from 'src/tecnicos/tecnicos.module';
import { ServicosModule } from 'src/servicos/servicos.module';
import { ContratosModule } from 'src/contratos/contratos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Custo]),
    ClientesModule,
    TecnicosModule,
    ServicosModule,
    ContratosModule,
  ],
  controllers: [CustosController],
  providers: [CustosService],
  exports: [TypeOrmModule],
})
export class CustosModule {}
