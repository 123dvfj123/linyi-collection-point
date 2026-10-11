import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'

// Pinia is installed before the router, because the route guard reads the auth
// store on the first navigation.
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

/*
 * Element Plus is installed as a dependency but is deliberately not registered
 * globally here. ADR-003 says it should be introduced page by page, and the
 * skeleton does not use a single component from it yet: registering it
 * globally would add roughly 1 MB to the bundle for nothing, which matters
 * because the resident pages are used on a phone.
 *
 * The first page that needs a table, a form or a dialog imports what it uses:
 *
 *   import { ElTable, ElTableColumn } from 'element-plus'
 *   import 'element-plus/dist/index.css'
 *
 * If the team later prefers global registration or automatic on-demand
 * imports, that is an architecture change and needs a new ADR.
 */