<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>
