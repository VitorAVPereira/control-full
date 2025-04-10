import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnicosModule } from './tecnicos/tecnicos.module';
import { ServicosModule } from './servicos/servicos.module';
import { ClientesModule } from './clientes/clientes.module';
import { ContratosModule } from './contratos/contratos.module';
import { CustosModule } from './custos/custos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'db-full',
      password: 'fullvision-2021',
      database: 'servicos_tecnicos',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TecnicosModule,
    ServicosModule,
    ClientesModule,
    ContratosModule,
    CustosModule,
  ],
})
export class AppModule {}
