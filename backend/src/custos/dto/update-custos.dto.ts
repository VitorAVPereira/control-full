import { PartialType } from '@nestjs/mapped-types';
import { CreateCustoDto } from './create-custos.dto';

export class UpdatecustoDto extends PartialType(CreateCustoDto) {}
