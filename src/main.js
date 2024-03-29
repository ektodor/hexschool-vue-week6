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
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
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
  generateMessage: VeeValidateI18n.localize({ zh_TW: zhTW }),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
// 使用 setLocale() 設定環境語言
VeeValidateI18n.setLocale('zh_TW')
app.use(router)
app.use(LoadingPlugin)
app.use(VueAxios, axios)

app.mount('#app')
