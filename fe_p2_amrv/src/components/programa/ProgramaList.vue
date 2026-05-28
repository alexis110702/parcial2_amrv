<script setup lang="ts">
import type { Programa } from '@/models/programa'
import http from '@/plugins/axios'
import { Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'programas'
const programas = ref<Programa[]>([])
const emit = defineEmits(['edit'])
const programaDelete = ref<Programa | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  programas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(programa: Programa) {
  emit('edit', programa)
}

function mostrarEliminarConfirm(programa: Programa) {
  programaDelete.value = programa
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${programaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

const programasFiltrados = computed(() => {
  return programas.value.filter(
    (programa) =>
      programa.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      (programa.nivelAcademico?.nombre ?? '').toLowerCase().includes(busqueda.value.toLowerCase()) ||
      programa.estado.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <DataTable
      :value="programasFiltrados"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 25]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} a {last} de {totalRecords}"
      scrollable
      scroll-height="flex"
      tableStyle="min-width: 50rem"
    >
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text @click="obtenerLista" />
      </template>
      <Column field="nivelAcademico.nombre" header="Nivel Académico" sortable />
      <Column field="nombre" header="Nombre" sortable />
      <Column field="version" header="Versión" sortable>
        <template #body="{ data }">v{{ data.version }}</template>
      </Column>
      <Column field="duracionMeses" header="Duración" sortable>
        <template #body="{ data }">{{ data.duracionMeses }} meses</template>
      </Column>
      <Column field="costo" header="Costo (Bs.)" sortable>
        <template #body="{ data }">{{ Number(data.costo).toFixed(2) }}</template>
      </Column>
      <Column field="fechaInicio" header="Fecha Inicio" sortable>
        <template #body="{ data }">{{ data.fechaInicio?.toString().slice(0, 10) }}</template>
      </Column>
      <Column field="estado" header="Estado" sortable />
      <Column header="Acciones" frozen align-frozen="right" style="min-width: 120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            text
            @click="mostrarEliminarConfirm(data)"
          />
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
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
