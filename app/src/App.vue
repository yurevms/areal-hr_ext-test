<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          test
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <!-- Вот наша кнопка Quasar -->
        <q-btn color="primary" label="Тест Quasar" @click="onClick" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Простая реакция на клик
const onClick = () => {
  alert('Кнопка нажата!')
}
</script>

<style>
/* Можно оставить пустым или добавить свои стили */
</style>
