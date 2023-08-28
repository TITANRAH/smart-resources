<script setup>
import { onMounted, ref, inject, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCustomStore } from '../../stores/custom';
import { doc } from 'firebase/firestore'
import { useDocument,useFirestore } from 'vuefire'

const toast = inject('toast')
const customStore = useCustomStore();
const route = useRoute();
const router = useRouter();
const db = useFirestore()

const docRef = doc(db, 'customs', route.params.id)
const custom = useDocument(docRef)


const formData = reactive({
    nombreCliente: '',
    ramaFeatureCliente: '',
    figmaUrlCliente: '',
    fechaCreacionCustom: '',
    fechaFinalizacionCustom: '',
    responsableCustom: '',
    estadoCustom: '',
    descripcionCustom: '',
})

watch(custom, (custom) => {
    if (!custom) {
        router.push({ name: 'custom' })
    }
    console.log('desde el watch', custom)

    if(custom.fechaCreacionCustom.includes('/') ){
    const [day, month, year] =  custom.fechaCreacionCustom.split("/")  ;

        if(day.length == 4){
            const formattedDate = `${day}-${month}-${year}`;
            formData.fechaCreacionCustom = formattedDate
            console.log('formattedDate / day = 4 ',formattedDate)
        } else {
            const formattedDate = `${year}-${month}-${day}`;
            formData.fechaCreacionCustom = formattedDate
            console.log('formattedDate / day != 4 ',formattedDate)
        }
   
    } else if(custom.fechaCreacionCustom.includes('-')) {
        const [day, month, year] =  custom.fechaCreacionCustom.split("-")  ;
        if(day.length == 4){
            const formattedDate = `${day}-${month}-${year}`;
            formData.fechaCreacionCustom = formattedDate
            console.log('formattedDate -  day = 4',formattedDate)
        } else {
            const formattedDate = `${year}-${month}-${day}`;
            formData.fechaCreacionCustom = formattedDate
            console.log('formattedDate - day != 4',formattedDate)
        }
    } else {
        formData.fechaCreacionCustom = custom.fechaCreacionCustom
    }

    formData.nombreCliente = custom.nombreCliente
    formData.ramaFeatureCliente = custom.ramaFeatureCliente
    formData.figmaUrlCliente = custom.figmaUrlCliente                                
    formData.fechaFinalizacionCustom = custom.fechaFinalizacionCustom
    formData.responsableCustom = custom.responsableCustom
    formData.estadoCustom = custom.estadoCustom
    formData.descripcionCustom = custom.descripcionCustom

})

const submitHandler = async data => {
    console.log(data)
    try {
        await customStore.updateCustom(docRef, { ...data })
        router.push({ name: 'custom-list' })
    } catch (error) {
        console.log(error)
    }
}


</script>

<template>
    <div class="custom-details">
        <v-card>
            <v-card-title class="titulo mt-3 ml-4">
                <div class="titulo-detalle">
                    <h4>Editar Customización</h4>
                    <v-btn icon><v-icon color="#0081A4">mdi-book-edit-outline</v-icon></v-btn>
                </div>
            </v-card-title>
            <v-card-text class="ml-4 ">
               
                    <FormKit type="form" :value="formData" submit-label="Guardar Cambios"
                    incomplete-message="No se pudo enviar, revisa los mensajes" @submit="submitHandler" :actions="false">

                    <FormKit 
                        type="text"
                        prefix-icon="people"
                        label="Nombre Cliente"
                        name="nombreCliente"
                        placeholder="Nombre del Cliente"
                        validation="required"
                        v-model.trim="formData.nombreCliente"
                        :validation-messages="{ required: 'El Nombre del cliente es obligatorio' }"
                    />
                    <FormKit 
                        type="select"
                        prefix-icon="avatarMan"
                        label="Responsable"
                        name="responsableCustom"                       
                        validation="required"
                        placeholder="Elige un responsable"
                        :options="[                           
                            'Sergio',
                            'Isi',
                            'Dani',
                            'Cesar',
                            'Mario'
                        ]"
                        v-model.trim="formData.responsableCustom"
                        :validation-messages="{ required: 'El Nombre del responsable es obligatorio' }"
                    />
                    <FormKit 
                        type="text"
                        prefix-icon="uploadCloud"
                        label="Rama Feature"
                        name="ramaFeatureCliente"
                        placeholder="Rama Feature"                     
                        v-model.trim="formData.ramaFeatureCliente"                      
                    />
                    <FormKit 
                        type="text"
                        label="Figma cliente"
                        prefix-icon="tools"
                        name="figmaUrlCliente"
                        placeholder="Figma cliente"                     
                        validation="required"
                        v-model.trim="formData.figmaUrlCliente"
                        :validation-messages="{ required: 'El Figma es obligatorio' }"                  
                    />
                    <FormKit 
                        type="date"
                        label="Fecha de creación"
                        prefix-icon="date"
                        name="fechaCreacionCustom"                       
                        validation="required"
                        v-model.trim="formData.fechaCreacionCustom"
                        :validation-messages="{ required: 'La fecha de creación es obligatoria' }"
                    />

                    <FormKit 
                        type="date"
                        prefix-icon="datetime"
                        label="Fecha finalización"
                        name="fechaFinalizacionCustom"                                                               
                        v-model.trim="formData.fechaFinalizacionCustom"                                        
                    />
                    <FormKit 
                        type="select"
                        label="Estado custom"
                        prefix-icon="check"
                        name="estadoCustom"
                        :options="[
                            'pendiente',
                            'realizada',                        
                        ]"
                        placeholder="Estado custom"                     
                        validation="required"
                        v-model.trim="formData.estadoCustom"
                        :validation-messages="{ required: 'El Estado es obligatorio' }"                  
                    />
                    <FormKit 
                        type="textarea"
                        prefix-icon="fileDoc"
                        label="Descripción"
                        name="descripcionCustom"
                        placeholder="Describe la tarea"                                      
                        v-model.trim="formData.descripcionCustom"
                    />  

                    
                    <FormKit
                        type="submit"
                        prefix-icon="uploadCloud"
                    >Guardar Cambios</FormKit>
                </Formkit>              
            </v-card-text>
        </v-card>
    </div>
</template>

<style scoped>
.custom-details {
    max-width: 450px;
    margin: 0 auto;
}

.titulo {
    color: #0081A4;
}

.copy {

    cursor: pointer
}

.titulo-detalle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.formulario{
    display: flex !important;
    flex-direction: column;
    justify-content: center;
}
</style>
  