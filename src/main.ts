import { createApp } from 'vue'
import App from './App.vue'

const root = document.createElement('div')
root.setAttribute('id', 'ImageTracerOverlayMount')
root.style.display = 'none'
document.body.appendChild(root)

const app = createApp(App)

app.mount(root)
