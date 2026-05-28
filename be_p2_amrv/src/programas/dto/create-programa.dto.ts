import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { EstadoPrograma } from '../entities/programa.entity';

export class CreateProgramaDto {
  @ApiProperty({
    description: 'ID del nivel académico',
    example: 1,
  })
  @IsNotEmpty({ message: 'El id_nivel_academico es obligatorio' })
  @IsInt()
  @IsPositive()
  idNivelAcademico: number;

  @ApiProperty({
    description: 'Nombre del programa',
    maxLength: 100,
    example: 'Maestría en Desarrollo Web',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Descripción del programa',
    maxLength: 2000,
    example: 'Programa de maestría enfocado en tecnologías web modernas',
  })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString()
  @MaxLength(2000)
  descripcion: string;

  @ApiProperty({
    description: 'Versión del programa',
    example: 1,
  })
  @IsNotEmpty({ message: 'La versión es obligatoria' })
  @IsInt()
  @Min(1)
  version: number;

  @ApiProperty({
    description: 'Duración en meses',
    example: 24,
  })
  @IsNotEmpty({ message: 'La duración en meses es obligatoria' })
  @IsInt()
  @IsPositive()
  duracionMeses: number;

  @ApiProperty({
    description: 'Costo del programa',
    example: 5000.00,
  })
  @IsNotEmpty({ message: 'El costo es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  costo: number;

  @ApiProperty({
    description: 'Fecha de inicio del programa',
    example: '2026-03-01',
  })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @IsDateString()
  fechaInicio: Date;

  @ApiProperty({
    description: 'Estado del programa',
    enum: EstadoPrograma,
    example: EstadoPrograma.EN_PLANIFICACION,
  })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsEnum(EstadoPrograma, {
    message: `Estado debe ser uno de: ${Object.values(EstadoPrograma).join(', ')}`,
  })
  estado: EstadoPrograma;
}
