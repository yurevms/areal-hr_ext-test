<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Отделы</div>
        <q-btn color="primary" label="Добавить отдел" @click="showDialog = true" />
      </q-card-section>

      <q-separator />

      <q-table
        :rows="departments"
        :columns="columns"
        row-key="id"
        :loading="loading"
        flat
        bordered
        class="q-mt-md"
      >
        <template v-slot:body-cell-actions="props">
          <q-td align="right">
            <q-btn flat color="red" icon="delete" @click="removeDepartment(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Диалог добавления отдела -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Новый отдел</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form @submit.prevent="save">
            <q-input v-model.number="form.organization_id" label="ID организации" type="number" outlined dense required />
            <q-input v-model.number="form.parent_id" label="ID родительского отдела" type="number" outlined dense class="q-mt-sm" />
            <q-input v-model="form.name" label="Название отдела" outlined dense required class="q-mt-sm" />
            <q-input v-model="form.comment" label="Комментарий" type="textarea" outlined dense required class="q-mt-sm" />

            <q-card-actions align="right" class="q-mt-md">
              <q-btn flat label="Отмена" color="grey" @click="showDialog = false" />
              <q-btn type="submit" color="primary" label="Сохранить" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar'

interface Department {
  id: number
  organization_id: number
  parent_id?: number | null
  name: string
  comment: string
}

const departments = ref<Department[]>([])
const loading = ref(false)
const showDialog = ref(false)

const form = ref({
  organization_id: 0,
  parent_id: null,
  name: '',
  comment: ''
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'organization_id', label: 'ID организации', field: 'organization_id' },
  { name: 'parent_id', label: 'ID родительского отдела', field: 'parent_id' },
  { name: 'name', label: 'Название', field: 'name' },
  { name: 'comment', label: 'Комментарий', field: 'comment' },
  { name: 'actions', label: 'Действия', field: 'actions', align: 'right' }
]

async function loadDepartments() {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/departments')
    if (!res.ok) throw new Error('Ошибка загрузки отделов')
    departments.value = await res.json()
  } catch (err) {
    console.error('Ошибка загрузки отделов:', err)
    Notify.create({ type: 'negative', message: 'Не удалось загрузить отделы' })
  } finally {
    loading.value = false
  }
}

async function save() {
  try {
    const res = await fetch('http://localhost:3000/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Ошибка при добавлении')
    }

    Notify.create({ type: 'positive', message: 'Отдел добавлен' })
    showDialog.value = false
    Object.keys(form.value).forEach(k => (form.value[k] = k === 'parent_id' ? null : 0 || ''))
    await loadDepartments()
  } catch (err: any) {
    console.error('Ошибка добавления отдела:', err)
    Notify.create({ type: 'negative', message: err.message })
  }
}

async function removeDepartment(id: number) {
  try {
    const res = await fetch(`http://localhost:3000/departments/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Ошибка удаления')
    Notify.create({ type: 'positive', message: 'Отдел удалён' })
    await loadDepartments()
  } catch (err: any) {
    console.error('Ошибка удаления:', err)
    Notify.create({ type: 'negative', message: err.message })
  }
}

onMounted(loadDepartments)
</script>
