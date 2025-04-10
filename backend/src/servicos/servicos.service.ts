import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from './entities/servico.entity';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Injectable()
export class ServicosService {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) {}

  async create(createServicoDto: CreateServicoDto) {
    const servico = this.servicoRepository.create({
      preco_padrao: createServicoDto.preco_padrao,
      tipo: createServicoDto.tipo,
    });

    await this.servicoRepository.save(servico);

    return servico;
  }

  findAll() {
    return this.servicoRepository.find();
  }

  findOne(id: number) {
    return this.servicoRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateServicoDto: UpdateServicoDto) {
    await this.servicoRepository.update(id, updateServicoDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.servicoRepository.delete(id);
  }
}
