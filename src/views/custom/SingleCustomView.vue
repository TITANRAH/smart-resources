<script setup>
import { onMounted, ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCustomStore } from '../../stores/custom';
const toast = inject('toast')
const customStore = useCustomStore();
const route = useRoute();
const router = useRouter();
const showFullFigmaUrl = ref(false);

onMounted(() => {
    customStore.getCustomById(route.params.id);
});


const copyToClipboard = (text) => {

navigator.clipboard.writeText(text)
  .then(() => {
      toast.open({
          message: 'Texto copiado al portapales',
          type: 'success'
         })
  })
  .catch((error) => {
      toast.open({
          message: 'No ha sido posible copiar el texto',
          type: 'error'
         })
  });
};

</script>

<template>
    <div class="custom-details">
        <v-card>
            <v-card-title class="titulo mt-3 ml-4">
              <div class="titulo-detalle">
                <h4>Detalles de Customización</h4> 
                <v-btn icon><v-icon @click="router.push({name: 'edit-custom', params: {id: id}})" color="#0081A4">mdi-book-edit-outline</v-icon> </v-btn>
              </div>
            </v-card-title>
            <v-card-text>
                <template v-if="customStore.singleCustom">
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <strong>Estado:</strong> {{ customStore.singleCustom.estadoCustom }}
                            </v-col>
                            <v-col cols="6">
                                <strong>Responsable:</strong> {{ customStore.singleCustom.responsableCustom == '' ? 'No asignado' :  customStore.singleCustom.responsableCustom  }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <strong>Cliente:</strong> {{ customStore.singleCustom.nombreCliente }}
                            </v-col>
                            <v-col cols="6">
                                <strong >Rama del Feature:</strong> <p  class="copy" @click="copyToClipboard(customStore.singleCustom.ramaFeatureCliente)">{{ customStore.singleCustom.ramaFeatureCliente }}</p> 
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <strong>Fecha de Creación:</strong> {{
                                    customStore.singleCustom.fechaCreacionCustom }}
                            </v-col>
                            <v-col cols="6">
                                <strong>Fecha de Creación:</strong> {{
                                    customStore.singleCustom.fechaFinalizacionCustom }}
                            </v-col>
                           
                        </v-row>

                        <v-row>

                            <v-col cols="6">
                                <strong>URL de Figma:</strong>
                                <div>
                                    <template v-if="showFullFigmaUrl">
                                    <a :href="customStore.singleCustom.figmaUrlCliente" target="_blank">{{ customStore.singleCustom.figmaUrlCliente }}</a>
                                    </template>
                                    <template v-else>
                                    <a @click="showFullFigmaUrl = true" target="_blank">{{ customStore.singleCustom.figmaUrlCliente.slice(0, 20) + '...' }}</a>
                                    </template>
                                </div>
                            </v-col>
                     
                            <v-col cols="6">
                                <strong>Descripción:</strong>
                                <p>
                                   {{ customStore.singleCustom.descripcionCustom == '' ? 'Sin descripción' : customStore.singleCustom.descripcionCustom }}  
                                </p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </template>
                <template v-else>

                    <div class="text-center">
                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </div>
               
                </template>
            </v-card-text>
        </v-card>
    </div>
</template>

<style scoped>
.custom-details {
    max-width: 600px;
    margin: 0 auto;
}

.titulo{
    color: #0081A4;
}

.copy{

    cursor :pointer
}

.titulo-detalle{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>
  


  