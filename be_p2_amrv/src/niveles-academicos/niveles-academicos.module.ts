import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelesAcademicosService } from './niveles-academicos.service';
import { NivelesAcademicosController } from './niveles-academicos.controller';
import { NivelAcademico } from './entities/nivel-academico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NivelAcademico])],
  controllers: [NivelesAcademicosController],
  providers: [NivelesAcademicosService],
  exports: [NivelesAcademicosService],
})
export class NivelesAcademicosModule {}
