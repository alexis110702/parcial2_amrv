import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNivelAcademicoDto {
  @ApiProperty({
    description: 'Nombre del nivel académico',
    maxLength: 20,
    example: 'Maestría',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(20)
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del nivel académico',
    maxLength: 500,
    example: 'Programa de maestría para profesionales con grado de licenciatura',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;
}
