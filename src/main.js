import Vue from 'vue'
import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'



const app = createApp(App);
components.forEach(component => {   
    app.component(component.name, component);   
})

app.mount('#app')

// import 'bootstrap/dist/css/bootstrap.css'
