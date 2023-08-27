import { computed } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection } from "vuefire";
import { collection, doc, where, query, getDocs, deleteDoc } from "firebase/firestore";

export const useCustomStore = defineStore('custom', () => {

   
    const db = useFirestore();
    
    
    const customCollection = useCollection(collection(db, 'customs'));
    
    const customPendientes = computed(() => {
        return customCollection.value.filter(c => c.estadoCustom == 'pendiente');
    });
    const customRealizadas = computed(() => {
        return customCollection.value.filter(c => c.estadoCustom == 'realizada');
    });

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
        deleteCustom
    };
});
