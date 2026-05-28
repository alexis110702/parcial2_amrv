import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    const programa = this.programaRepository.create(createProgramaDto);
    return await this.programaRepository.save(programa);
  }

  async findAll(): Promise<Programa[]> {
    return await this.programaRepository.find({
      relations: ['nivelAcademico'],
      order: {
        nivelAcademico: { nombre: 'ASC' },
        nombre: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Programa> {
    const programa = await this.programaRepository.findOne({
      where: { id },
      relations: ['nivelAcademico'],
    });
    if (!programa) {
      throw new NotFoundException(`Programa con id ${id} no encontrado`);
    }
    return programa;
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
    const programa = await this.findOne(id);
    Object.assign(programa, updateProgramaDto);
    return await this.programaRepository.save(programa);
  }

  async remove(id: number): Promise<void> {
    const programa = await this.findOne(id);
    await this.programaRepository.softRemove(programa);
  }
}
