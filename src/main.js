import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useInputStore } from "./stores/useInputStore";
// import anime from "animejs";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

// 將 anime 註冊為全域屬性
// app.config.globalProperties.$anime = anime;

app.use(pinia);
app.use(router);

// 初始化應用程式後設定 token 監控
app.mount("#app");

// 在 pinia 和 app 初始化完成後才能使用 store
const inputStore = useInputStore();

// 啟動 token 過期監控
console.log('🚀 初始化 Token 過期監控');
inputStore.startTokenMonitoring();

// 頁面可見性變化時重新檢查 token（用戶切換到其他分頁後回來）
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && inputStore.token) {
    console.log('👁️ 頁面重新可見，檢查 Token 狀態');
    if (!inputStore.checkTokenValidity()) {
      // token 已過期，跳轉到登入頁
      router.push('/login');
    }
  }
});

// 監聽 token 過期事件
window.addEventListener('token-expired', () => {
  console.log('🚫 收到 Token 過期事件，跳轉到登入頁');
  if (router.currentRoute.value.path !== '/login') {
    router.push('/login');
  }
});
