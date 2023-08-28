<script setup>

import { useCustomStore } from '../../stores/custom';
import Custom from '../../components/Custom.vue'

const customs = useCustomStore()


</script>
<template>
 
 <div class="contenedor-custom">


    <Custom
       v-for="custom in customs.customRealizadas"
       :key="custom.nombreCliente"
       :custom="custom"
       />

 </div>

</template>


<style>

.contenedor-custom {
   display: flex;
   flex-direction: row;
   justify-content: center;
   flex-wrap: wrap;
}

</style>