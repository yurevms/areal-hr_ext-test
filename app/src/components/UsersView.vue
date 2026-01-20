<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <h3>Пользователи</h3>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="users"
          :columns="columns"
          row-key="id"
          flat
          bordered
          dense
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface User {
  id: number
  login: string
  last_name: string
  first_name: string
  patronymic?: string
  role_id: number
}

const users = ref<User[]>([])

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'login', label: 'Логин', field: 'login' },
  { name: 'last_name', label: 'Фамилия', field: 'last_name' },
  { name: 'first_name', label: 'Имя', field: 'first_name' },
  { name: 'patronymic', label: 'Отчество', field: 'patronymic' },
  { name: 'role_id', label: 'Роль', field: 'role_id' },
]

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/users')
    users.value = await res.json()
  } catch (err) {
    console.error('Ошибка загрузки пользователей:', err)
  }
})
</script>
