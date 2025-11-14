<script setup>
import { onMounted, defineProps } from 'vue';
import { useInputStore } from '../stores/useInputStore';
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
    // 取得User資料
    function handleCredentialResponse(response) {
        const data = parseJwt(response.credential)
        inputStore.setPicture(data.picture);
        console.log(data)
        // window.location.href = '/search';
    }

    onMounted(()=>{
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