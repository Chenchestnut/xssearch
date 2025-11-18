<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import googleLogin from './googleLogin.vue';
import { useTurnstile } from '../composables/useTurnstile';
import Navbar from './Navbar.vue';

const router = useRouter();
const email = ref('');
const password = ref('');
const { renderTurnstile, initTurnstile, hasValidToken, resetTurnstile, debugTurnstileState, getCurrentToken } = useTurnstile();
const turnstileWidgetId = ref(null);
const canShowGoogleLogin = ref(false);
const turnstileStatus = ref('等待驗證...');

function handleLogin(){
    router.push('/search');
}

// 測試帳號登入
function handleTestLogin() {
    if (!checkTokenStatus()) {
        alert('請先完成機器人驗證！');
        return;
    }
    
    // 使用固定的Premium測試帳號
    const testAccount = {
        google_id: "test_premium_user_12345",
        name: "測試用戶 Premium",
        email: "test-premium@yuntech.dev",
        permission: true
    };
    
    // 發送測試登入請求到後端
    console.log('🧪 使用測試帳號登入:', testAccount.email);
    
    // 模擬 Google 登入的流程
    simulateTestLogin(testAccount);
}

// 模擬測試帳號登入
async function simulateTestLogin(testAccount) {
    try {
        console.log('🔄 開始測試帳號登入流程...');
        console.log('📧 測試帳號:', testAccount.email);
        console.log('🎫 權限狀態:', testAccount.permission ? 'Premium' : 'Free');
        
        // 獲取 Turnstile token
        const turnstileToken = getCurrentToken();
        if (!turnstileToken) {
            throw new Error('缺少 Turnstile token');
        }
        
        console.log('🎫 使用 Turnstile token:', turnstileToken.substring(0, 20) + '...');
        
        // 創建假的 Google JWT token
        const fakeGoogleToken = createFakeGoogleToken(testAccount);
        console.log('🤖 創建假 Google token:', fakeGoogleToken.substring(0, 50) + '...');
        
        // 調用後端登入 API
        const response = await fetch('https://api-xssearch.brid.pw/api/auth/google/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                google_token: fakeGoogleToken,
                turnstile_token: turnstileToken
            })
        });
        
        console.log('📡 後端回應狀態:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('❌ 後端錯誤回應:', errorData);
            throw new Error(`HTTP ${response.status}: ${errorData}`);
        }
        
        const data = await response.json();
        console.log('✅ 後端回應資料:', data);
        
        if (data.success) {
            console.log('🎉 測試帳號登入成功！');
            // 這裡可以儲存 token 和跳轉，類似 googleLogin 的處理
            alert(`測試帳號登入成功！\n帳號: ${testAccount.email}\n權限: ${testAccount.permission ? 'Premium' : 'Free'}`);
            router.push('/search');
        } else {
            throw new Error(data.message || '登入失敗');
        }
        
    } catch (error) {
        console.error('❌ 測試帳號登入錯誤:', error);
        alert(`測試帳號登入失敗：${error.message}`);
    }
}

// 創建假的 Google JWT token 用於測試
function createFakeGoogleToken(testAccount) {
    // 模擬 Google JWT token 的結構
    const header = {
        "alg": "RS256",
        "kid": "test_kid_12345",
        "typ": "JWT"
    };
    
    const payload = {
        "iss": "https://accounts.google.com",
        "azp": "662832463958-rqc7cm2esgstvens4iitsmptgiph62hh.apps.googleusercontent.com",
        "aud": "662832463958-rqc7cm2esgstvens4iitsmptgiph62hh.apps.googleusercontent.com",
        "sub": testAccount.google_id,
        "email": testAccount.email,
        "email_verified": true,
        "name": testAccount.name,
        "picture": "https://via.placeholder.com/96x96.png?text=Test",
        "given_name": testAccount.name.split(' ')[0],
        "family_name": testAccount.name.split(' ').slice(1).join(' '),
        "iat": Math.floor(Date.now() / 1000),
        "exp": Math.floor(Date.now() / 1000) + 3600 // 1小時後過期
    };
    
    // 安全的 base64 編碼，支援 UTF-8 字符（包含中文）
    const encodedHeader = btoa(unescape(encodeURIComponent(JSON.stringify(header))));
    const encodedPayload = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const fakeSignature = btoa("fake_signature_for_test_account");
    
    return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
}

// 重新驗證 Turnstile
function retryTurnstile() {
    console.log('🔄 重試 Turnstile 驗證...');
    debugTurnstileState();
    
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
    console.log('📝 登入頁面 onMounted 被呼叫');
    
    // 初始化 Turnstile
    await initTurnstile();
    
    debugTurnstileState();
    
    // 渲柔 Turnstile 小工具
    turnstileWidgetId.value = await renderTurnstile(
        'turnstile-widget-login',
        (token) => {
            canShowGoogleLogin.value = true;
            turnstileStatus.value = '驗證成功！現在可以登入';
            console.log('✅ Turnstile 驗證成功，顯示 Google 登入');
            console.log('🎫 新 Token:', token.substring(0, 20) + '...');
            
            // 立即檢查 token 是否正確儲存
            setTimeout(() => {
                const storedToken = getCurrentToken();
                console.log('🔍 驗證後檢查 token 狀態:', storedToken ? '已儲存' : '未儲存');
                debugTurnstileState();
            }, 100);
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
<Navbar />
<section class="registerPage">
    <div class="login">
        <div class="google">
            登入即註冊
        </div>
        
        <!-- Turnstile 驗證小工具 -->
        <div class="turnstile-container">
            <div id="turnstile-widget-login"></div>
        </div>
        
        <!-- 只有在 Turnstile 驗證成功後才顯示 Google 登入 -->
        <div v-if="canShowGoogleLogin" class="google-login-container">
            <googleLogin />
            
            <!-- 測試帳號登入按鈕 -->
            <div class="test-login-section">
                <div class="divider">或</div>
                <button @click="handleTestLogin" class="test-login-btn">
                    🧪 測試用帳號登入
                </button>
                <p class="test-account-info">
                    測試帳號 (Premium): test-premium@yuntech.dev
                </p>
            </div>
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
        
        .test-login-section {
            margin-top: 2rem;
            text-align: center;
            
            .divider {
                margin: 1.5rem 0;
                color: #9ca3af;
                font-size: 0.9rem;
                position: relative;
                
                &:before, &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    width: 45%;
                    height: 1px;
                    background-color: #d1d5db;
                }
                
                &:before {
                    left: 0;
                }
                
                &:after {
                    right: 0;
                }
            }
            
            .test-login-btn {
                background-color: #f3f4f6;
                color: $word-color;
                border: 2px solid #d1d5db;
                padding: 0.75rem 1.5rem;
                border-radius: 0.375rem;
                cursor: pointer;
                font-size: 0.95rem;
                font-weight: 500;
                transition: all 0.2s;
                
                &:hover {
                    background-color: #e5e7eb;
                    border-color: #9ca3af;
                }
                
                &:active {
                    background-color: #d1d5db;
                }
            }
            
            .test-account-info {
                margin-top: 1rem;
                font-size: 0.8rem;
                color: #6b7280;
                line-height: 1.4;
            }
        }
    }
}

</style>
