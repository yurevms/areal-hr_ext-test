<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Организации</div>
        <q-btn color="primary" label="Добавить организацию" @click="showDialog = true" />
      </q-card-section>

      <q-separator />

      <q-table
        :rows="organizations"
        :columns="columns"
        row-key="id"
        :loading="loading"
        flat
        bordered
        class="q-mt-md"
      >
        <template v-slot:body-cell-actions="props">
          <q-td align="right">
            <q-btn flat color="red" icon="delete" @click="removeOrganization(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Диалог добавления организации -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Новая организация</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form @submit.prevent="save">
            <q-input v-model="form.name" label="Название" outlined dense required />
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

interface Organization {
  id: number
  name: string
  comment: string
}

const organizations = ref<Organization[]>([])
const loading = ref(false)
const showDialog = ref(false)

const form = ref({
  name: '',
  comment: ''
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Название', field: 'name' },
  { name: 'comment', label: 'Комментарий', field: 'comment' },
  { name: 'actions', label: 'Действия', field: 'actions', align: 'right' }
]

async function loadOrganizations() {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/organizations')
    if (!res.ok) throw new Error('Ошибка загрузки организаций')
    organizations.value = await res.json()
  } catch (err) {
    console.error('Ошибка загрузки организаций:', err)
    Notify.create({ type: 'negative', message: 'Не удалось загрузить организации' })
  } finally {
    loading.value = false
  }
}

async function save() {
  try {
    const res = await fetch('http://localhost:3000/organizations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Ошибка при добавлении')
    }

    Notify.create({ type: 'positive', message: 'Организация добавлена' })
    showDialog.value = false
    Object.keys(form.value).forEach(k => (form.value[k] = ''))
    await loadOrganizations()
  } catch (err: any) {
    console.error('Ошибка добавления организации:', err)
    Notify.create({ type: 'negative', message: err.message })
  }
}

async function removeOrganization(id: number) {
  try {
    const res = await fetch(`http://localhost:3000/organizations/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Ошибка удаления')
    Notify.create({ type: 'positive', message: 'Организация удалена' })
    await loadOrganizations()
  } catch (err: any) {
    console.error('Ошибка удаления:', err)
    Notify.create({ type: 'negative', message: err.message })
  }
}

onMounted(loadOrganizations)
</script>
