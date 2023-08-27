<template>
    <v-card class="card-with-shadow" elevation="8">
      <v-row align="center">
        <v-col cols="10">
          <v-card-title class="title">
            {{ custom.nombreCliente }}
          </v-card-title>
        </v-col>
       
            <v-row>
                <v-icon class="eye-icon">mdi-eye</v-icon>
                <v-icon class="delete-icon ml-2" @click="customStore.deleteCustom(custom.id);">mdi-delete</v-icon>

            </v-row>
     
      </v-row>
    </v-card>
  </template>
  
  <style scoped>
  .card-with-shadow {
    border-radius: 8px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin: 10px;
    width: 20%;
    cursor: pointer;
  }
  
  .title {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }
  
  .delete-col {
    text-align: right;
  }
  
  .delete-icon {
    cursor: pointer;
    color: #ff0000; /* Color rojo para el icono de eliminar */
  }

  .eye-icon{
    color: #0B9DE0;
  }
  </style>
  
  <script setup>
  import { useCustomStore } from '../stores/custom';
  
  const customStore = useCustomStore();
  
  defineProps({
    custom: {
      type: Object
    }
  });
  

  </script>
  