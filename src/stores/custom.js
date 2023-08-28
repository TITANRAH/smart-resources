import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection  } from "vuefire";
import { collection, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "vue-router";


export const useCustomStore = defineStore('custom', () => {
    
    
    const router = useRouter()
    const db = useFirestore();
    const singleCustom = ref(null)
    
    
    const customCollection = useCollection(collection(db, 'customs'));
    
    const customPendientes = computed(() => {
        return customCollection.value.filter(c => c.estadoCustom == 'pendiente');
    });
    const customRealizadas = computed(() => {
        return customCollection.value.filter(c => c.estadoCustom == 'realizada');
    });

    const goSingleCustom = async (id) => {

      await  router.push({name: 'customizacion', params:{ id: id}})
    }

    const getCustomById = async (customId) => {
        try {
            const customDocRef = doc(db, 'customs', customId);
            const docSnapshot = await getDoc(customDocRef);

            if (docSnapshot.exists()) {
               singleCustom.value = docSnapshot.data();
            } else {
                console.log('El documento no existe');
            }
        } catch (error) {
            console.error('Error al obtener el documento:', error);
        }
    };

    
    async function updateCustom(docRef, custom){
        console.log('product a editar desde updateProduct store', custom)
   
            // si no hay una imagen en el producto a editar que viene de bd 
            // entonces toma todos los valores incluso la imagen y mandala a firebase
            await updateDoc(docRef, custom)
      

    }


    const deleteCustom = async (customId) => {
        console.log(customId)
        try {
            const customDocRef = doc(db, 'customs', customId);
            await deleteDoc(customDocRef);
            console.log('Custom eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el Custom:', error);
        }
    };
    return {
        customCollection,
        customPendientes,
        customRealizadas,
        deleteCustom,
        goSingleCustom,
        getCustomById,
        singleCustom,
        updateCustom
    };
});
