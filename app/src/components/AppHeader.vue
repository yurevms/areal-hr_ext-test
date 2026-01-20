<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title>Areal HR</q-toolbar-title>

      <q-btn flat round icon="dashboard" to="/dashboard" title="Панель управления" />
      <q-btn flat round icon="people" to="/users" title="Пользователи" />
      <q-btn flat round icon="group" to="/employees" title="Сотрудники" />
      <q-btn flat round icon="business" to="/departments" title="Отделы" />
      <q-btn flat round icon="apartment" to="/organizations" title="Организации" />
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
</script>
