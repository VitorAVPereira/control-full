import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTecnicoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  custosPorServico: Array<{
    servicoId: number;
    custo: number;
  }>;
}