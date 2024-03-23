import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import message from "@/components/notify/index"

Vue.config.productionTip = false;

Vue.use(ElementUI)

Vue.use(message.register)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')