<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Areal HR</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" side="left">
      <q-list>
        <q-item clickable v-for="item in menu" :key="item.name" :to="item.path">
          <q-item-section>{{ item.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const menu = [
  { name: 'Пользователи', path: '/users' },
  { name: 'Отделы', path: '/departments' },
  { name: 'Сотрудники', path: '/employees' },
  { name: 'Организации', path: '/organizations' },
  { name: 'Должности', path: '/positions' },
  { name: 'HR операции', path: '/hr-operations' },
  { name: 'Файлы', path: '/files' },
]
</script>
