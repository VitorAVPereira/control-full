import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsString()
  @IsNotEmpty()
  contato: string;
}
