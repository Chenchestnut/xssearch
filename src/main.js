import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import anime from "animejs";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

// 將 anime 註冊為全域屬性
// app.config.globalProperties.$anime = anime;

app.use(pinia);
app.use(router);
app.mount("#app");
