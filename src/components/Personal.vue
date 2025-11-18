<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useAlert } from '../SweetAlert';
import { useInputStore } from '../stores/useInputStore';

const {showWarning} = useAlert();
const router = useRouter();
const inputStore = useInputStore();
const props = defineProps({
    token:String,
})

const options = computed(() => [
    { title: '升級方案' ,icon:'fa-regular fa-circle-up',action:'update',show: props.token && !inputStore.userInfo.permission},
    { title: '登出',icon:'fa-solid fa-arrow-right-from-bracket',action:'logout' ,show:props.token},
    { title:'登入',icon:'fa-solid fa-arrow-right-to-bracket',action:'login' ,show:!props.token},
    { title:'註冊',icon:'fa-solid fa-user-plus',action:'login' ,show:!props.token}
]);

function handleClick(action){
    switch(action){
        case 'update':
            router.push('/membership');
            break;
        case 'logout':
            inputStore.removeToken();
            window.google.accounts.id.disableAutoSelect(); // 取消自動登入
            router.push('/');
            // 刷新頁面以確保介面狀態更新
            break;
        case 'login':
            router.push('/login');
            break;
    }
}
</script>

<template>
<div class="personal">
    <section class="opt">
        <ul>
            <li v-for="(option, index) in options" v-show="option.show" :key="index" @click="handleClick(option.action)"><i :class="option.icon"></i>{{ option.title }}</li>
        </ul>
    </section>
</div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.personal{
    section.opt{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(210, 213, 218, 0.8);
        width: auto;
        max-width: 180px;
        min-height: 10vh;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 35px;
        ul{
            width: 155px;
            height: 100%;
            padding: 0.5rem 1.5rem;
            list-style: none;
            text-align: left;
            margin: 0;
            li{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                padding: 0.5rem 0.5rem 0.5rem 0.5rem;
                border-radius: 35px;
                color: $word-color;
                cursor: pointer;
                transition: all 0.3s ease;
                i{
                    margin-right: 0.5rem;
                }
                &:hover{
                    background-color: #B5B8A3;
                    color: white;
                }
            }
        }
    }
}
</style>
