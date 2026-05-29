import type { NivelAcademico } from './nivelAcademico'

export type EstadoPrograma = 'En Planificación' | 'En curso' | 'Finalizado'

export const ESTADOS_PROGRAMA: EstadoPrograma[] = ['En Planificación', 'En curso', 'Finalizado']

export type ModalidadClases = 'Presencial' | 'Virtual' | 'Mixto'

export const MODALIDADES_CLASES: ModalidadClases[] = ['Presencial', 'Virtual', 'Mixto']

export interface Programa {
  id: number
  idNivelAcademico: number
  nombre: string
  descripcion: string
  version: number
  duracionMeses: number
  costo: number
  fechaInicio: string
  estado: EstadoPrograma
  nivelAcademico: NivelAcademico
  areaConocimiento: ModalidadClases
}
