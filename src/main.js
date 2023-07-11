import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'


// импорт компонентов на глобальный уровень и передача их через цикл
const app = createApp(App);
components.forEach(component => {
    app.component(component.name, component);

   
})

app.mount('#app')
