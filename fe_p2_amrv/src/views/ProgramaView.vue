<script setup lang="ts">
import ProgramaList from '@/components/programa/ProgramaList.vue'
import ProgramaSave from '@/components/programa/ProgramaSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const programaListRef = ref<typeof ProgramaList | null>(null)
const programaEdit = ref<any>(null)

function handleCreate() {
  programaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(programa: any) {
  programaEdit.value = programa
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  programaListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Programas de Postgrado</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <ProgramaList ref="programaListRef" @edit="handleEdit" />
    <ProgramaSave
      :mostrar="mostrarDialog"
      :programa="programaEdit"
      :modoEdicion="!!programaEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
