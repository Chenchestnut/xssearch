<script setup>
import { onMounted, defineProps } from 'vue';
import { useInputStore } from '../stores/useInputStore';
import axios from 'axios';
const inputStore = useInputStore();

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
        inputStore.setToken(token);
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
    }

    // ✅ 處理 Google 登入回調
async function handleCredentialResponse(response) {
    // showLoading('登入中...');
    
    try {
        // 方案 1：將 Google token 發送到後端驗證
        const backendResponse = await axios.post(
            '/api/auth/google/login/',  // ✅ 替換成你的後端 API
            {
                "google_token": response.credential
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        // ✅ 處理後端回應
        const { token, user } = backendResponse.data;
        
        // 儲存後端返回的 JWT token
        inputStore.setToken(token);
        
        // 儲存使用者資訊
        inputStore.setPicture(user.picture);
        inputStore.setUserInfo({
            email: user.email,
            name: user.name,
            id: user.id
        });
        
        console.log('登入成功:', user);
        
        // closeLoading();
        
        // 跳轉到首頁或搜尋頁
        router.push('/search');
        
    } catch (error) {
        console.error('登入失敗:', error);
        // closeLoading();
        
        const errorMessage = error.response?.data?.message || '登入失敗，請稍後再試';
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

    onMounted(()=>{
        if (!window.google) {
        console.error('Google API 尚未載入');
        return;
        }

        window.google.accounts.id.initialize({
            client_id: '119893423798-4ukrf82d1k5sn59sqqrvp8kg7qejd8i2.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: false,
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