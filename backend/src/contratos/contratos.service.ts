import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Servico } from '../servicos/entities/servico.entity';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private contratoRepository: Repository<Contrato>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) {}

  async create(createContratoDto: CreateContratoDto): Promise<Contrato> {
    const cliente = await this.clienteRepository.findOneBy({
      id: createContratoDto.clienteId,
    });
    if (!cliente) throw new NotFoundException('Cliente não encontrado!');

    const servico = await this.servicoRepository.findOneBy({
      id: createContratoDto.servicoId,
    });
    if (!servico) throw new NotFoundException('Serviço não encontrado!');

    const contrato = this.contratoRepository.create({
      ...createContratoDto,
      cliente,
      servico,
    });

    return this.contratoRepository.save(contrato);
  }

  findAll(): Promise<Contrato[]> {
    return this.contratoRepository.find({ relations: ['cliente', 'servico'] });
  }

  async findOne(id: number): Promise<Contrato> {
    const contrato = await this.contratoRepository.findOne({
      where: { id },
      relations: ['cliente', 'servico'],
    });
    if (!contrato)
      throw new NotFoundException(`Contrato com ID ${id} não encontrado!`);
    return contrato;
  }

  async update(
    id: number,
    updateContratoDto: UpdateContratoDto,
  ): Promise<Contrato> {
    const contrato = await this.findOne(id);
    const updated = this.contratoRepository.merge(contrato, updateContratoDto);
    return this.contratoRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const contrato = await this.findOne(id);
    await this.contratoRepository.remove(contrato);
  }
}
