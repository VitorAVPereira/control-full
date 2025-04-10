import { Transform } from 'class-transformer';
import {
  IsDecimal,
  IsEnum,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateContratoDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  data_inicio: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  data_renovacao?: Date; // Opcional (depende do tipo_servico)

  @IsEnum(['mensal', 'unico'])
  @IsNotEmpty()
  tipo_servico: 'mensal' | 'unico';

  @IsNumber()
  @IsNotEmpty()
  num_placas: number;

  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  preco_cobrado: number;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @IsNotEmpty()
  servicoId: number;
}
