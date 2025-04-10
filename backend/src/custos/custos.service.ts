import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Custo } from './entities/custo.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Tecnico } from '../tecnicos/entities/tecnico.entity';
import { Servico } from '../servicos/entities/servico.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { CreateCustoDto } from './dto/create-custos.dto';
import { UpdatecustoDto } from './dto/update-custos.dto';

@Injectable()
export class CustosService {
  constructor(
    @InjectRepository(Custo)
    private custoRepository: Repository<Custo>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Tecnico)
    private tecnicoRepository: Repository<Tecnico>,

    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,

    @InjectRepository(Contrato)
    private contratoRepository: Repository<Contrato>,
  ) {}

  async create(createCustoDto: CreateCustoDto): Promise<Custo> {
    const cliente = await this.clienteRepository.findOneBy({
      id: createCustoDto.clienteId,
    });
    if (!cliente) throw new NotFoundException('Cliente não encontrado!');

    const tecnico = createCustoDto.tecnicoId
      ? await this.tecnicoRepository.findOneBy({ id: createCustoDto.tecnicoId })
      : undefined;

    const servico = createCustoDto.servicoId
      ? await this.servicoRepository.findOneBy({ id: createCustoDto.servicoId })
      : undefined;

    const contrato = createCustoDto.contratoId
      ? await this.contratoRepository.findOneBy({
          id: createCustoDto.contratoId,
        })
      : undefined;

    const custo = new Custo();
    custo.tipo = createCustoDto.tipo;
    custo.valor = createCustoDto.valor;
    custo.cliente = cliente;
    custo.tecnico = tecnico || undefined;
    custo.servico = servico || undefined;
    custo.contrato = contrato || undefined;

    return this.custoRepository.save(custo);
  }

  findAll(): Promise<Custo[]> {
    return this.custoRepository.find({
      relations: ['cliente', 'tecnico', 'servico', 'contrato'],
    });
  }

  async findOne(id: number): Promise<Custo> {
    const custo = await this.custoRepository.findOne({
      where: { id },
      relations: ['cliente', 'tecnico', 'servico', 'contrato'],
    });
    if (!custo) {
      throw new NotFoundException(`Custo com ID ${id} não encontrado!`);
    }
    return custo;
  }

  async update(id: number, updateCustoDto: UpdatecustoDto): Promise<Custo> {
    const custo = await this.findOne(id);
    const updated = this.custoRepository.merge(custo, updateCustoDto);
    return this.custoRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const custo = await this.findOne(id);
    await this.custoRepository.remove(custo);
  }
}
