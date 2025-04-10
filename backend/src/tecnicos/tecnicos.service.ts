import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tecnico } from './entities/tecnico.entity';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { TecnicoServicoCusto } from './entities/tecnico-servico-custo.entity';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';

@Injectable()
export class TecnicosService {
  constructor(
    @InjectRepository(Tecnico)
    private tecnicoRepository: Repository<Tecnico>,

    @InjectRepository(TecnicoServicoCusto)
    private tscRepository: Repository<TecnicoServicoCusto>,
  ) {}

  async create(createTecnicoDto: CreateTecnicoDto) {
    const tecnico = this.tecnicoRepository.create({
      nome: createTecnicoDto.nome,
    });

    await this.tecnicoRepository.save(tecnico);

    const custos = createTecnicoDto.custosPorServico.map((custo) => {
      return this.tscRepository.create({
        tecnico: tecnico,
        servico: { id: custo.servicoId },
        custo: custo.custo,
      });
    });

    await this.tscRepository.save(custos);

    return tecnico;
  }

  findAll() {
    return this.tecnicoRepository.find({ relations: ['custosPorServico'] });
  }

  findOne(id: number) {
    return this.tecnicoRepository.findOne({
      where: { id },
      relations: ['custosPorServico'],
    });
  }

  async update(id: number, updateTecnicoDto: UpdateTecnicoDto) {
    await this.tecnicoRepository.update(id, updateTecnicoDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.tecnicoRepository.delete(id);
  }
}
