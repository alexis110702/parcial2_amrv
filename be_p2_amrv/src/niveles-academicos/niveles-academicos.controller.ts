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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NivelesAcademicosService } from './niveles-academicos.service';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivel-academico.dto';

@ApiTags('Niveles Académicos')
@Controller('niveles-academicos')
export class NivelesAcademicosController {
  constructor(private readonly nivelesAcademicosService: NivelesAcademicosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo nivel académico' })
  @ApiResponse({ status: 201, description: 'Nivel académico creado exitosamente' })
  create(@Body() createNivelAcademicoDto: CreateNivelAcademicoDto) {
    return this.nivelesAcademicosService.create(createNivelAcademicoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los niveles académicos' })
  @ApiResponse({ status: 200, description: 'Lista de niveles académicos' })
  findAll() {
    return this.nivelesAcademicosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un nivel académico por ID' })
  @ApiResponse({ status: 200, description: 'Nivel académico encontrado' })
  @ApiResponse({ status: 404, description: 'Nivel académico no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.nivelesAcademicosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un nivel académico' })
  @ApiResponse({ status: 200, description: 'Nivel académico actualizado exitosamente' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNivelAcademicoDto: UpdateNivelAcademicoDto,
  ) {
    return this.nivelesAcademicosService.update(id, updateNivelAcademicoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un nivel académico (soft delete)' })
  @ApiResponse({ status: 204, description: 'Nivel académico eliminado exitosamente' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nivelesAcademicosService.remove(id);
  }
}
