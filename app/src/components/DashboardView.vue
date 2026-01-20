<template>
  <div class="q-pa-md">
    <h2>Dashboard</h2>
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-3">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2">Пользователи</div>
              <div class="text-h5">{{ usersCount }}</div>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2">Сотрудники</div>
              <div class="text-h5">{{ employeesCount }}</div>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2">Отделы</div>
              <div class="text-h5">{{ departmentsCount }}</div>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2">Организации</div>
              <div class="text-h5">{{ organizationsCount }}</div>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const usersCount = ref(0)
const employeesCount = ref(0)
const departmentsCount = ref(0)
const organizationsCount = ref(0)

onMounted(async () => {
  try {
    const usersRes = await fetch('http://localhost:3000/users')
    usersCount.value = (await usersRes.json()).length

    const employeesRes = await fetch('http://localhost:3000/employees')
    employeesCount.value = (await employeesRes.json()).length

    const departmentsRes = await fetch('http://localhost:3000/departments')
    departmentsCount.value = (await departmentsRes.json()).length

    const organizationsRes = await fetch('http://localhost:3000/organizations')
    organizationsCount.value = (await organizationsRes.json()).length
  } catch (err) {
    console.error('Ошибка загрузки данных для Dashboard:', err)
  }
})
</script>
