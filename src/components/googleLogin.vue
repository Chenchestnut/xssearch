<script setup>
import { onMounted, defineProps} from 'vue';
import { useInputStore } from '../stores/useInputStore';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const inputStore = useInputStore();
const isGoogleLoaded = ref(false);
const props =defineProps({
    width:{
        type: String,
        default: 'null'
    },
    height:{
        type: String,
        default: 'null'
    }
})
//這個function是要將拿到的User資料(Base64)轉成js的物件型態方便取用
function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

return JSON.parse(jsonPayload);
}

function waitForGoogleAPI() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkGoogle = setInterval(() => {
            attempts++;
            
            if (window.google && window.google.accounts) {
                clearInterval(checkGoogle);
                isGoogleLoaded.value = true;
                resolve();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkGoogle);
                reject(new Error('Google API 載入超時'));
            }
        }, 100);
    });
}

async function handleCredentialResponse(response) {
    try{
        //取得google給的token，查看資訊
        const googleUserData = parseJwt(response.credential);
        console.log('Google 使用者資料:', googleUserData);
        inputStore.setPicture(googleUserData.picture);

        // 驗證 Google Token 的基本資訊
        if (!googleUserData) {
            throw new Error('無法解析 Google Token');
        }
        
        if (googleUserData.aud !== '119893423798-4ukrf82d1k5sn59sqqrvp8kg7qejd8i2.apps.googleusercontent.com') {
            console.warn('⚠️ Client ID 不匹配:', googleUserData.aud);
        }
        
        // 檢查 Token 是否過期
        const now = Math.floor(Date.now() / 1000);
        if (googleUserData.exp && googleUserData.exp < now) {
            throw new Error('Google Token 已過期');
        }
        
        console.log('📤 發送 Google Token 到後端驗證...');
        console.log('Token 長度:', response.credential.length);
        console.log('Token 前 50 字元:', response.credential.substring(0, 50) + '...');

        //然後把token傳到後端
        const backendResponse = await axios.post(
            'https://api-xssearch.brid.pw/api/auth/google/login/',
            {google_token: response.credential},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        console.log('後端回應狀態:', backendResponse.status);
        console.log('後端回應資料:', backendResponse.data);

        // 處理後端回應的JWT
        if (!backendResponse.data.success) {
            throw new Error('後端回應失敗');
        }

        const { token, user } = backendResponse.data.data;
        console.log('👤 使用者資料 (從後端):', user);

        //儲存JWT Token，後面api請求會用到
        inputStore.setToken(token);
        
        //儲存使用者資訊
        inputStore.setUserInfo({
            id: user.id,
            name: user.name,
            email: user.email,
            permission: user.permission || []
        })

        //跳轉頁面
        router.push('/search');
    }catch (error) {
        console.error('=== ❌ 登入錯誤詳細資訊 ===');
        console.error('錯誤類型:', error.constructor.name);
        console.error('錯誤訊息:', error.message);
        
        if (error.response) {
            // 後端有回應但狀態碼錯誤
            console.error('📛 後端回應錯誤:');
            console.error('  - 狀態碼:', error.response.status);
            console.error('  - 狀態文字:', error.response.statusText);
            console.error('  - 回應資料:', error.response.data);
            console.error('  - 回應 headers:', error.response.headers);
            
            // ✅ 顯示後端的詳細錯誤訊息
            if (error.response.data) {
                console.error('📋 後端錯誤詳情:');
                console.error(JSON.stringify(error.response.data, null, 2));
                
                // 如果有 message 或 error 欄位
                if (error.response.data.message) {
                    console.error('  - 錯誤訊息:', error.response.data.message);
                }
                if (error.response.data.error) {
                    console.error('  - 錯誤:', error.response.data.error);
                }
                if (error.response.data.detail) {
                    console.error('  - 詳情:', error.response.data.detail);
                }
            }
        } else if (error.request) {
            console.error('📛 請求已發送但無回應');
        } else {
            console.error('📛 請求設定錯誤:', error.message);
        }
        
        console.error('==============================');
        
        
        // 顯示錯誤訊息給使用者
        let errorTitle = '登入錯誤';
        let errorMessage = '登入失敗，請稍後再試';
        
        if (error.response?.status === 401) {
            errorTitle = 'Google 登入驗證失敗';
            const data = error.response.data;
            
            // 根據後端回應構建錯誤訊息
            if (data.message) {
                errorMessage = data.message;
            } else if (data.error) {
                errorMessage = data.error;
            } else {
                errorMessage = '後端無法驗證 Google Token\n\n' +
                              '請檢查：\n' +
                              '• 後端 GOOGLE_CLIENT_ID 是否正確\n' +
                              '• Google Cloud Console 設定是否正確\n' +
                              '• 後端日誌中的詳細錯誤';
            }
            
            if (data.detail) {
                errorMessage += '\n\n詳情: ' + data.detail;
            }
        } else if (error.code === 'ECONNABORTED') {
            errorTitle = '連線超時';
            errorMessage = '請求超時，請檢查網路連線';
        } else if (!error.response) {
            errorTitle = '連線失敗';
            errorMessage = '無法連接到伺服器';
        }
    }
};



onMounted(async ()=>{
    await waitForGoogleAPI();
    window.google.accounts.id.initialize({
        client_id: '119893423798-4ukrf82d1k5sn59sqqrvp8kg7qejd8i2.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: false,
        ux_mode: 'popup'
    });

    window.google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large', width: props.width, height: props.height }
    );
})
</script>

<template>
    <div class="googleLogin">
        <div id="google-sign-in-button"></div>
    </div>
</template>


<style lang="scss" scoped>
.googleLogin {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    :deep(#google-sign-in-button) {
        border-radius: 25px !important; // 調整這個數值來控制圓角程度
        overflow: hidden;
    }
}
</style>