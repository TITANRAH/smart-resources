<script setup>
  import {  ref, getDownloadURL, uploadBytesResumable  } from 'firebase/storage'
  import { collection, addDoc } from 'firebase/firestore'
  import {  useFirestore  } from 'vuefire'
  import { custom } from '../../data/custom'

  const db = useFirestore();

  async function seedDB()  {
    
    const customsCollection = collection(db, "customs");
    for (let i = 1; i < custom.length; i++) {
          
          addDoc(customsCollection, { 
              nombreCliente: custom[i - 1 ].nombreCliente,
              ramaFeatureCliente: custom[i - 1 ].ramaFeatureCliente,
              figmaUrlCliente: custom[i - 1 ].figmaUrlCliente,
              fechaCreacionCustom: custom[i - 1 ].fechaCreacionCustom,
              fechaFinalizacionCustom: custom[i - 1 ].fechaFinalizacionCustom,
              responsableCustom: custom[i - 1 ].responsableCustom,
              estado: custom[i - 1 ].estado,
          }).then(() => {
            console.log("Custom Agregada...");
          }).catch((error) => {
            console.error(error);
          });
          if(i === custom.length - 1 ) {
            alert('Se subieron las Customs')
          }
    }
  }

</script>


<template>
    <div >
        <h1>Seeder</h1>

        <div>
            <div>     
              <div>
                  <FormKit
                      type="form"
                      submit-label="Agregar Customs"
                      incomplete-message="No se pudo enviar, revisa los mensajes"
                      @submit="seedDB"
                    > 
                  </FormKit>
                </div>
            </div>
        </div>
  </div>
</template>