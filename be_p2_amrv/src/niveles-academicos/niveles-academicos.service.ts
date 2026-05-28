import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NivelAcademico } from './entities/nivel-academico.entity';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivel-academico.dto';

@Injectable()
export class NivelesAcademicosService {
  constructor(
    @InjectRepository(NivelAcademico)
    private readonly nivelAcademicoRepository: Repository<NivelAcademico>,
  ) {}

  async create(createNivelAcademicoDto: CreateNivelAcademicoDto): Promise<NivelAcademico> {
    const nivelAcademico = this.nivelAcademicoRepository.create(createNivelAcademicoDto);
    return await this.nivelAcademicoRepository.save(nivelAcademico);
  }

  async findAll(): Promise<NivelAcademico[]> {
    return await this.nivelAcademicoRepository.find({
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<NivelAcademico> {
    const nivelAcademico = await this.nivelAcademicoRepository.findOne({
      where: { id },
      relations: ['programas'],
    });
    if (!nivelAcademico) {
      throw new NotFoundException(`Nivel académico con id ${id} no encontrado`);
    }
    return nivelAcademico;
  }

  async update(id: number, updateNivelAcademicoDto: UpdateNivelAcademicoDto): Promise<NivelAcademico> {
    const nivelAcademico = await this.findOne(id);
    Object.assign(nivelAcademico, updateNivelAcademicoDto);
    return await this.nivelAcademicoRepository.save(nivelAcademico);
  }

  async remove(id: number): Promise<void> {
    const nivelAcademico = await this.findOne(id);
    await this.nivelAcademicoRepository.softRemove(nivelAcademico);
  }
}
