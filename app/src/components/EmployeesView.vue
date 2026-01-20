<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Сотрудники</div>
        <q-btn color="primary" label="Добавить сотрудника" @click="showDialog = true" />
      </q-card-section>

      <q-separator />

      <q-table
        :rows="employees"
        :columns="columns"
        row-key="id"
        :loading="loading"
        flat
        bordered
        class="q-mt-md"
      >
        <template v-slot:body-cell-actions="props">
          <q-td align="right">
            <q-btn flat color="red" icon="delete" @click="removeEmployee(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Диалог добавления сотрудника -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 600px">
        <q-card-section>
          <div class="text-h6">Новый сотрудник</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form @submit.prevent="save">
            <q-input v-model="form.last_name" label="Фамилия" outlined dense required />
            <q-input v-model="form.first_name" label="Имя" outlined dense required class="q-mt-sm" />
            <q-input v-model="form.patronymic" label="Отчество" outlined dense class="q-mt-sm" />

            <q-input
              v-model="form.birth_date"
              label="Дата рождения"
              type="date"
              outlined
              dense
              required
              class="q-mt-sm"
            />

            <q-input v-model="form.pasport_series" label="Серия паспорта" outlined dense required class="q-mt-sm" />
            <q-input v-model="form.pasport_number" label="Номер паспорта" outlined dense required class="q-mt-sm" />
            <q-input
              v-model="form.pasport_date_of_issue"
              label="Дата выдачи паспорта"
              type="date"
              outlined
              dense
              required
              class="q-mt-sm"
            />
            <q-input v-model="form.pasport_unit_code" label="Код подразделения" outlined dense required class="q-mt-sm" />
            <q-input v-model="form.pasport_issued_by" label="Кем выдан" outlined dense required class="q-mt-sm" />

            <q-input v-model="form.address_area" label="Регион" outlined dense required class="q-mt-sm" />
            <q-input v-model="form.address_city" label="Город" outlined dense required class="q-mt-sm" />
            <q-input v-model="form.address_street" label="Улица" outlined dense required class="q-mt-sm" />
            <q-input v-model="form.address_house" label="Дом" outlined dense required class="q-mt-sm" />
            <q-input v-model="form.address_building" label="Корпус" outlined dense class="q-mt-sm" />
            <q-input v-model="form.address_apartment" label="Квартира" outlined dense class="q-mt-sm" />

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

interface Employee {
  id: number
  last_name: string
  first_name: string
  patronymic?: string
  birth_date: string
  pasport_series: string
  pasport_number: string
  pasport_date_of_issue: string
  pasport_unit_code: string
  pasport_issued_by: string
  address_area: string
  address_city: string
  address_street: string
  address_house: string
  address_building?: string
  address_apartment?: string
}

const employees = ref<Employee[]>([])
const loading = ref(false)
const showDialog = ref(false)

const form = ref({
  last_name: '',
  first_name: '',
  patronymic: '',
  birth_date: '',
  pasport_series: '',
  pasport_number: '',
  pasport_date_of_issue: '',
  pasport_unit_code: '',
  pasport_issued_by: '',
  address_area: '',
  address_city: '',
  address_street: '',
  address_house: '',
  address_building: '',
  address_apartment: ''
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'last_name', label: 'Фамилия', field: 'last_name' },
  { name: 'first_name', label: 'Имя', field: 'first_name' },
  { name: 'patronymic', label: 'Отчество', field: 'patronymic' },
  { name: 'birth_date', label: 'Дата рождения', field: 'birth_date' },
  { name: 'actions', label: 'Действия', field: 'actions', align: 'right' }
]

async function loadEmployees() {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/employees')
    if (!res.ok) throw new Error('Ошибка загрузки сотрудников')
    employees.value = await res.json()
  } catch (err) {
    console.error('Ошибка загрузки сотрудников:', err)
    Notify.create({ type: 'negative', message: 'Не удалось загрузить сотрудников' })
  } finally {
    loading.value = false
  }
}

async function save() {
  try {
    const res = await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Ошибка при добавлении')
    }

    Notify.create({ type: 'positive', message: 'Сотрудник добавлен' })
    showDialog.value = false
    Object.keys(form.value).forEach(k => (form.value[k] = ''))
    await loadEmployees()
  } catch (err: any) {
    console.error('Ошибка добавления сотрудника:', err)
    Notify.create({ type: 'negative', message: err.message })
  }
}

async function removeEmployee(id: number) {
  try {
    const res = await fetch(`http://localhost:3000/employees/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Ошибка удаления')
    Notify.create({ type: 'positive', message: 'Сотрудник удалён' })
    await loadEmployees()
  } catch (err: any) {
    console.error('Ошибка удаления:', err)
    Notify.create({ type: 'negative', message: err.message })
  }
}

onMounted(loadEmployees)
</script>
