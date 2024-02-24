import './assets/main.css'
// 外部套件
import 'bootstrap/scss/bootstrap.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as VeeValidateRules from '@vee-validate/rules'
import * as VeeValidateI18n from '@vee-validate/i18n'
// 內部
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    defineRule(rule, VeeValidateRules[rule])
  }
})

// Activate the locale
configure({
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('../public/zh_TW.json')

// Activate the locale
configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
app.use(router)
app.use(LoadingPlugin)
app.use(VueAxios, axios)

app.mount('#app')
