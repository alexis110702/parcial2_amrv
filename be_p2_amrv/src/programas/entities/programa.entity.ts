import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { NivelAcademico } from "../../niveles-academicos/entities/nivel-academico.entity";

export enum EstadoPrograma {
  EN_PLANIFICACION = "En Planificación",
  EN_CURSO = "En curso",
  FINALIZADO = "Finalizado",
}

export enum ModalidadClases {
  PRESENCIAL = "Presencial",
  VIRTUAL = "Virtual",
  MIXTO = "Mixto",
}

@Entity("programas")
export class Programa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "id_nivel_academico", type: "int", nullable: false })
  idNivelAcademico: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  nombre: string;

  @Column({ type: "varchar", length: 2000, nullable: false })
  descripcion: string;

  @Column({ type: "int", nullable: false })
  version: number;

  @Column({ name: "duracion_meses", type: "int", nullable: false })
  duracionMeses: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  costo: number;

  @Column({ name: "fecha_inicio", type: "date", nullable: false })
  fechaInicio: Date;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    enum: EstadoPrograma,
  })
  estado: EstadoPrograma;

  @Column({
    name: "modalidad_clases",
    type: "varchar",
    length: 20,
    nullable: false,
    enum: ModalidadClases,
  })
  modalidadClases: ModalidadClases;

  @CreateDateColumn({ name: "fecha_creacion" })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: "fecha_modificacion" })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: "fecha_eliminacion" })
  fechaEliminacion: Date;

  @ManyToOne(() => NivelAcademico, (nivel) => nivel.programas)
  @JoinColumn({ name: "id_nivel_academico" })
  nivelAcademico: NivelAcademico;
}
