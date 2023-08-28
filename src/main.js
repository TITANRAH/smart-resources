import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import { plugin, defaultConfig} from '@formkit/vue'
import { useToast } from 'vue-toast-notification'
import config from '../form-kit'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import {VueFire, VueFireAuth} from 'vuefire'
import {firebaseApp} from '../config/firebase'
import router from './router'

// init vuetify
const vuetify = createVuetify({
    components,
    directives
})

const app = createApp(App)
// use vuetify
// use firebase
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()]
})

const $toast = useToast({
    duration: 3000,
    position:'top'
})

app.provide('toast', $toast)
app.use(router)
app.use(vuetify)
app.use(plugin, defaultConfig(config))
app.use(createPinia())
app.mount('#app')



