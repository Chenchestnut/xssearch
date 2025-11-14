<script setup>
import { onMounted, defineProps, ref } from 'vue';
import { useInputStore } from '../stores/useInputStore';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAlert } from '../SweetAlert';
const {showWarning} = useAlert();
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

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('解析 JWT 失敗:', error);
        return null;
    }
}

// ✅ 等待 Google API 載入
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

// ✅ 處理 Google 登入回調
async function handleCredentialResponse(response) {
    // showLoading('登入中...');
    
    try {
        console.log('=== Google 登入開始 ===');
        console.log('Google Token:', response.credential);
        
        const googleUserData = parseJwt(response.credential);
        console.log('Google 使用者資料:', googleUserData);

        console.log('發送 Google token 到後端...');
        // ✅ 根據後端 API 文件格式發送請求
        const backendResponse = await axios.post(
            'https://api-xssearch.brid.pw/api/auth/google/login/',
            {
                google_token: response.credential  // ✅ 符合後端格式
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000
            }
        );

        console.log('後端完整回應:', backendResponse);
        console.log('後端回應資料:', backendResponse.data);
        
        // ✅ 根據後端回應格式處理
        if (backendResponse.data.success) {
            const { token, user } = backendResponse.data.data;
            
            console.log('JWT Token:', token);
            console.log('使用者資料:', user);

            // 儲存 JWT token
            inputStore.setToken(token);
            
            // 儲存使用者資訊
            inputStore.setUserInfo({
                id: user.id,
                name: user.name,
                email: user.email,
                permission: user.permission
            });
            
            // ✅ 如果後端有回傳頭像，儲存頭像
            if (user.picture || user.avatar) {
                inputStore.setPicture(user.picture || user.avatar);
            } else {
                // 如果後端沒有回傳，從 Google token 中解析
                const googleUserData = parseJwt(response.credential);
                inputStore.setPicture(googleUserData.picture);
            }
            
            console.log('登入成功:', user);
            
            closeLoading();
            
            // 跳轉到搜尋頁
            router.push('/search');
        } else {
            throw new Error('登入失敗');
        }
        
    } catch (error) {
        console.error('登入失敗:', error);
        console.error('錯誤詳情:', error.response?.data);
        
        // closeLoading();
        
        let errorMessage = '登入失敗，請稍後再試';
        
        if (error.code === 'ECONNABORTED') {
            errorMessage = '請求超時，請檢查網路連線';
        } else if (error.response) {
            errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          `伺服器錯誤 (${error.response.status})`;
        } else if (error.request) {
            errorMessage = '無法連接到伺服器，請檢查網路';
        }
        
        showWarning('登入錯誤', errorMessage);
    }
}


    // 取得User資料
    // function handleCredentialResponse(response) {
    //     const data = parseJwt(response.credential)
    //     inputStore.setPicture(data.picture);
    //     console.log(data)
    //     // window.location.href = '/search';
    // }

    onMounted(async()=>{
        // if (!window.google) {
        // console.error('Google API 尚未載入');
        // return;
        // }

        // window.google.accounts.id.initialize({
        //     client_id: '119893423798-4ukrf82d1k5sn59sqqrvp8kg7qejd8i2.apps.googleusercontent.com',
        //     callback: handleCredentialResponse,
        //     auto_select: false,
        //     cancel_on_tap_outside: false,
        // });

        // window.google.accounts.id.renderButton(
        //     document.getElementById('google-sign-in-button'),
        //     { theme: 'outline', size: 'large', width: props.width, height: props.height }
        // );

        try {
        console.log('=== 初始化 Google 登入 ===');
        
        // 等待 Google API 載入
        await waitForGoogleAPI();
        console.log('Google API 已載入');
        
        // ✅ 初始化 Google Sign-In（使用 popup 模式解決 COOP 問題）
        window.google.accounts.id.initialize({
            client_id: '119893423798-4ukrf82d1k5sn59sqqrvp8kg7qejd8i2.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            ux_mode: 'popup',  // ✅ 關鍵：使用 popup 模式
            context: 'signin',
            itp_support: true
        });

        // 渲染按鈕
        const buttonElement = document.getElementById('google-sign-in-button');
        if (buttonElement) {
            window.google.accounts.id.renderButton(
                buttonElement,
                { 
                    theme: 'outline', 
                    size: 'large', 
                    width: props.width, 
                    height: props.height,
                    text: 'signin_with',
                    shape: 'rectangular',
                    logo_alignment: 'left'
                }
            );
            console.log('Google 登入按鈕已渲染');
        } else {
            console.error('找不到 google-sign-in-button 元素');
        }
        
    } catch (error) {
        console.error('初始化失敗:', error);
        showWarning('載入錯誤', 'Google 登入服務載入失敗');
    }
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