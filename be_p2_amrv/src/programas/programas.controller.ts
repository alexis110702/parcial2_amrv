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
import { ProgramasService } from './programas.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@ApiTags('Programas')
@Controller('programas')
export class ProgramasController {
  constructor(private readonly programasService: ProgramasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo programa de postgrado' })
  @ApiResponse({ status: 201, description: 'Programa creado exitosamente' })
  create(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programasService.create(createProgramaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los programas ordenados por nivel académico' })
  @ApiResponse({ status: 200, description: 'Lista de programas' })
  findAll() {
    return this.programasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un programa por ID' })
  @ApiResponse({ status: 200, description: 'Programa encontrado' })
  @ApiResponse({ status: 404, description: 'Programa no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un programa' })
  @ApiResponse({ status: 200, description: 'Programa actualizado exitosamente' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramaDto: UpdateProgramaDto,
  ) {
    return this.programasService.update(id, updateProgramaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un programa (soft delete)' })
  @ApiResponse({ status: 204, description: 'Programa eliminado exitosamente' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.programasService.remove(id);
  }
}
