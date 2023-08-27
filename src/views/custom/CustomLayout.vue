  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

// CONSTANTES  
  const tabs = [
    { name: 'Customizaciones', route: 'custom-list' },
    { name: 'Pendientes', route: 'custom-pendientes' },
    { name: 'Realizadas', route: 'custom-realizadas' },
  ];
  
  const activeTab = ref(tabs[0].route);
  const router = useRouter();
  
// FIN CONSTANTES

//   METODOS
  
  const navigateToTab = (tab) => {
    router.push({ name: tab.route });
  };

//   FIN METODOS

  </script>
  
<template>
    <div>
      <v-card>
        <v-card-title>
          <v-tabs v-model="activeTab">
            <v-tab v-for="(tab, index) in tabs" :key="index" @click="navigateToTab(tab)">
              {{ tab.name }}
            </v-tab>
          </v-tabs>
        </v-card-title> 
        <v-card-text>
          <router-view />
        </v-card-text>
      </v-card>
      <router-view name="custom" />
    </div>
  </template>
  
  
  <style scoped>
  /* Estilos personalizados para los colores */

  .v-tabs {
    background-color: #e0dbdb;
    width: 100%;
  }
  
  </style>
  