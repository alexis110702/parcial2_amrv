<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivelAcademico'
import http from '@/plugins/axios'
import { Column, DataTable, Dialog } from 'primevue'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'niveles-academicos'
const nivelesAcademicos = ref<NivelAcademico[]>([])
const emit = defineEmits(['edit'])
const nivelAcademicoDelete = ref<NivelAcademico | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  nivelesAcademicos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(nivelAcademico: NivelAcademico) {
  emit('edit', nivelAcademico)
}

function mostrarEliminarConfirm(nivelAcademico: NivelAcademico) {
  nivelAcademicoDelete.value = nivelAcademico
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${nivelAcademicoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <DataTable
      :value="nivelesAcademicos"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 25]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} a {last} de {totalRecords}"
      scrollable
      scroll-height="flex"
      tableStyle="min-width: 30rem"
    >
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text @click="obtenerLista" />
      </template>
      <Column field="nombre" header="Nombre" sortable />
      <Column field="descripcion" header="Descripción" sortable />
      <Column header="Acciones" style="min-width: 120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
          <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>