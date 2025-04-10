import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  create(@Body() createContratoDto: CreateContratoDto) {
    return this.contratosService.create(createContratoDto);
  }

  @Get()
  findAll() {
    return this.contratosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contratosService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateContratoDto: UpdateContratoDto,
  ) {
    return this.contratosService.update(+id, updateContratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contratosService.remove(+id);
  }
}
