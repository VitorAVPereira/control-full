import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CustosService } from './custos.service';
import { CreateCustoDto } from './dto/create-custos.dto';
import { UpdatecustoDto } from './dto/update-custos.dto';

@Controller('custos')
export class CustosController {
  constructor(private readonly custosService: CustosService) {}

  @Post()
  create(@Body() createCustoDto: CreateCustoDto) {
    return this.custosService.create(createCustoDto);
  }

  @Get()
  findAll() {
    return this.custosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.custosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCustoDto: UpdatecustoDto) {
    return this.custosService.update(+id, updateCustoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.custosService.remove(+id);
  }
}
