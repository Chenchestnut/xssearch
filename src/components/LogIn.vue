<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import googleLogin from './googleLogin.vue';
import { useTurnstile } from '../composables/useTurnstile';

const router = useRouter();
const email = ref('');
const password = ref('');
const { renderTurnstile, initTurnstile } = useTurnstile();
const turnstileWidgetId = ref(null);
const canShowGoogleLogin = ref(false);

function handleLogin(){
    router.push('/search');
}

onMounted(async () => {
    // 初始化 Turnstile
    await initTurnstile();
    
    // 渲染 Turnstile 小工具
    turnstileWidgetId.value = await renderTurnstile(
        'turnstile-widget-login',
        (token) => {
            canShowGoogleLogin.value = true;
            console.log('✅ Turnstile 驗證成功，顯示 Google 登入');
        },
        (error) => {
            canShowGoogleLogin.value = false;
            console.error('❌ Turnstile 驗證失敗:', error);
        }
    );
});
</script>

<template>
<section class="registerPage">
    <div class="login">
        <div class="google">
            登入
        </div>
        
        <!-- Turnstile 驗證小工具 -->
        <div class="turnstile-container">
            <div id="turnstile-widget-login"></div>
        </div>
        
        <!-- 只有在 Turnstile 驗證成功後才顯示 Google 登入 -->
        <div v-if="canShowGoogleLogin" class="google-login-container">
            <googleLogin />
        </div>
        
        <!-- 未完成驗證的提示 -->
        <div v-if="!canShowGoogleLogin" class="verification-hint">
            <p>請先完成安全驗證</p>
        </div>
    </div>
</section>
</template>


<style lang="scss" scoped>
$word-color:#2F2F2F;
section.registerPage{
    background-image: url('../assets/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    box-sizing: border-box;
    color: $word-color;
    
    div.login{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        div.google{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            padding: 8rem 0 0 0;
        }
        
        .turnstile-container {
            margin-top: 3rem;
            display: flex;
            justify-content: center;
            
            #turnstile-widget-login {
                transform: scale(0.9);
                transform-origin: center;
            }
            
            @media screen and (max-width: 520px) {
                margin-top: 2rem;
                
                #turnstile-widget-login {
                    transform: scale(0.8);
                }
            }
        }
        
        .google-login-container {
            margin-top: 2rem;
            opacity: 1;
            transition: opacity 0.3s ease-in;
        }
        
        .verification-hint {
            margin-top: 2rem;
            text-align: center;
            color: #666;
            font-size: 1.1rem;
            
            p {
                margin: 0;
            }
        }
    }
}

</style>
