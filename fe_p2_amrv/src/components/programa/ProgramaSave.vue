<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivelAcademico'
import type { Programa } from '@/models/programa'
import { ESTADOS_PROGRAMA } from '@/models/programa'
import http from '@/plugins/axios'
import { InputNumber, Select, Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'programas'
const props = defineProps({
  mostrar: Boolean,
  programa: {
    type: Object as () => Programa,
    default: () => ({}) as Programa,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const nivelesAcademicos = ref<NivelAcademico[]>([])
const programa = ref<Programa>({ ...props.programa })

watch(
  () => props.programa,
  (newVal) => {
    programa.value = { ...newVal }
  },
)

async function obtenerNivelesAcademicos() {
  nivelesAcademicos.value = await http.get('niveles-academicos').then((res) => res.data)
}

async function handleSave() {
  try {
    const body = {
      idNivelAcademico: programa.value.idNivelAcademico,
      nombre: programa.value.nombre,
      descripcion: programa.value.descripcion,
      version: programa.value.version,
      duracionMeses: programa.value.duracionMeses,
      costo: programa.value.costo,
      fechaInicio: programa.value.fechaInicio,
      estado: programa.value.estado,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${programa.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    programa.value = {} as Programa
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerNivelesAcademicos()
      if (props.programa?.id) {
        programa.value = { ...props.programa }
      } else {
        programa.value = { estado: 'En Planificación' } as Programa
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Programa'"
      style="width: 30rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nivelAcademico" class="font-semibold w-4">Nivel Académico</label>
        <Select
          id="nivelAcademico"
          v-model="programa.idNivelAcademico"
          :options="nivelesAcademicos"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText
          id="nombre"
          v-model="programa.nombre"
          class="flex-auto"
          autocomplete="off"
          maxlength="100"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-4">Descripción</label>
        <Textarea
          id="descripcion"
          v-model="programa.descripcion"
          class="flex-auto"
          autocomplete="off"
          rows="3"
          maxlength="2000"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="version" class="font-semibold w-4">Versión</label>
        <InputNumber
          id="version"
          v-model="programa.version"
          class="flex-auto"
          :min="1"
          :useGrouping="false"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracionMeses" class="font-semibold w-4">Duración (meses)</label>
        <InputNumber
          id="duracionMeses"
          v-model="programa.duracionMeses"
          class="flex-auto"
          :min="1"
          :useGrouping="false"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="costo" class="font-semibold w-4">Costo (Bs.)</label>
        <InputNumber
          id="costo"
          v-model="programa.costo"
          class="flex-auto"
          :min="0"
          :minFractionDigits="2"
          :maxFractionDigits="2"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fechaInicio" class="font-semibold w-4">Fecha Inicio</label>
        <InputText
          id="fechaInicio"
          v-model="programa.fechaInicio"
          class="flex-auto"
          type="date"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold w-4">Estado</label>
        <Select
          id="estado"
          v-model="programa.estado"
          :options="ESTADOS_PROGRAMA"
          class="flex-auto"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        />
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
