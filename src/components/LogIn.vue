<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import googleLogin from './googleLogin.vue';
import { useTurnstile } from '../composables/useTurnstile';

const router = useRouter();
const email = ref('');
const password = ref('');
const { renderTurnstile, initTurnstile, hasValidToken, resetTurnstile } = useTurnstile();
const turnstileWidgetId = ref(null);
const canShowGoogleLogin = ref(false);
const turnstileStatus = ref('等待驗證...');

function handleLogin(){
    router.push('/search');
}

// 重新驗證 Turnstile
function retryTurnstile() {
    if (turnstileWidgetId.value) {
        resetTurnstile(turnstileWidgetId.value);
        canShowGoogleLogin.value = false;
        turnstileStatus.value = '等待驗證...';
    }
}

// 檢查 token 狀態
function checkTokenStatus() {
    const hasToken = hasValidToken();
    console.log('🔍 檢查 Turnstile token 狀態:', hasToken);
    if (!hasToken && canShowGoogleLogin.value) {
        console.warn('⚠️ Token 已失效，需要重新驗證');
        canShowGoogleLogin.value = false;
        turnstileStatus.value = 'Token 已過期，請重新驗證';
    }
    return hasToken;
}

onMounted(async () => {
    // 初始化 Turnstile
    await initTurnstile();
    
    // 渲柔 Turnstile 小工具
    turnstileWidgetId.value = await renderTurnstile(
        'turnstile-widget-login',
        (token) => {
            canShowGoogleLogin.value = true;
            turnstileStatus.value = '驗證成功！';
            console.log('✅ Turnstile 驗證成功，顯示 Google 登入');
            console.log('🎫 新 Token:', token.substring(0, 20) + '...');
        },
        (error) => {
            canShowGoogleLogin.value = false;
            turnstileStatus.value = '驗證失敗，請重試';
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
            <p>{{ turnstileStatus }}</p>
            <button 
                v-if="turnstileStatus.includes('失敗') || turnstileStatus.includes('過期')" 
                @click="retryTurnstile" 
                class="retry-btn"
            >
                🔄 重新驗證
            </button>
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
                margin: 0 0 1rem 0;
            }
            
            .retry-btn {
                background-color: #f59e0b;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.375rem;
                cursor: pointer;
                font-size: 0.9rem;
                transition: background-color 0.2s;
                
                &:hover {
                    background-color: #d97706;
                }
            }
        }
    }
}

</style>
