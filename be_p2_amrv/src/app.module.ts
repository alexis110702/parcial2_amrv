import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelesAcademicosModule } from './niveles-academicos/niveles-academicos.module';
import { ProgramasModule } from './programas/programas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'parcial2',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_DATABASE || 'parcial2_amrv',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    NivelesAcademicosModule,
    ProgramasModule,
  ],
})
export class AppModule {}
