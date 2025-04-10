import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateServicoDto {
  @IsString()
  @IsNotEmpty({ message: 'O tipo do serviço é obrigatório!' })
  tipo: string;

  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'O preço deve ser um número decimal com até 2 casas.' },
  )
  @IsNotEmpty({ message: 'O preço padrão é obrigatório!' })
  preco_padrao: number;
}
