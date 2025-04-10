import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustoDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  valor: number;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @IsOptional()
  tecnicoId?: number;

  @IsNumber()
  @IsOptional()
  servicoId?: number;

  @IsNumber()
  @IsOptional()
  contratoId?: number;
}
