<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivelAcademico'
import http from '@/plugins/axios'
import { Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'niveles-academicos'
const props = defineProps({
  mostrar: Boolean,
  nivelAcademico: {
    type: Object as () => NivelAcademico,
    default: () => ({}) as NivelAcademico,
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

const nivelAcademico = ref<NivelAcademico>({ ...props.nivelAcademico })
watch(
  () => props.nivelAcademico,
  (newVal) => {
    nivelAcademico.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: nivelAcademico.value.nombre,
      descripcion: nivelAcademico.value.descripcion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${nivelAcademico.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    nivelAcademico.value = {} as NivelAcademico
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Nivel Académico' : 'Crear Nivel Académico'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="nivelAcademico.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
          maxlength="20"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripción</label>
        <Textarea
          id="descripcion"
          v-model="nivelAcademico.descripcion"
          class="flex-auto"
          autocomplete="off"
          rows="3"
          maxlength="500"
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
