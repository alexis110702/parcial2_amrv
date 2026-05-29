import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NivelesAcademicosService } from './niveles-academicos.service';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivel-academico.dto';

@ApiTags('Niveles Académicos')
@Controller('niveles-academicos')
export class NivelesAcademicosController {
  constructor(private readonly nivelesAcademicosService: NivelesAcademicosService) {}

  @Post()
  create(@Body() createNivelAcademicoDto: CreateNivelAcademicoDto) {
    return this.nivelesAcademicosService.create(createNivelAcademicoDto);
  }

  @Get()
  findAll() {
    return this.nivelesAcademicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.nivelesAcademicosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNivelAcademicoDto: UpdateNivelAcademicoDto,
  ) {
    return this.nivelesAcademicosService.update(id, updateNivelAcademicoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nivelesAcademicosService.remove(id);
  }
}