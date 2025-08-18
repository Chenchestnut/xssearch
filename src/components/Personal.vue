<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAlert } from '../SweetAlert';
import { useInputStore } from '../stores/useInputStore';

const {showWarning} = useAlert();
const router = useRouter();
const inputStore = useInputStore();
const props = defineProps({
    token:Boolean,
})

const options = [
    { title: '升級方案' ,icon:'fa-regular fa-circle-up',action:'update',login:true},
    { title: '登出',icon:'fa-solid fa-arrow-right-from-bracket',action:'logout' ,login:props.token},
    { title:'登入',icon:'fa-solid fa-arrow-right-to-bracket',action:'login' ,login:!props.token}
];

function handleClick(action){
    switch(action){
        case 'update':
            router.push('/membership');
            break;
        case 'logout':
            inputStore.removeToken();
            window.google.accounts.id.disableAutoSelect(); // 取消自動登入
            router.push('/');
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
            <li v-if="option.login" v-for="(option, index) in options" :key="index" @click="handleClick(option.action)"><i :class="option.icon"></i>{{ option.title }}</li>
        </ul>
    </section>
</div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.personal{
    section.opt{
        display: flex;
        background-color: rgba(210, 213, 218, 0.8);
        width: auto;
        max-width: 180px;
        min-height: 10vh;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 35px;
        ul{
            width: 100%;
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
