import type { NivelAcademico } from './nivelAcademico'

export type EstadoPrograma = 'En Planificación' | 'En curso' | 'Finalizado'

export const ESTADOS_PROGRAMA: EstadoPrograma[] = ['En Planificación', 'En curso', 'Finalizado']

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
}
