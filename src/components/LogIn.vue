<script setup>
import { useRouter } from 'vue-router';
import {ref} from 'vue';
import googleLogin from './googleLogin.vue';
const router = useRouter();
const email = ref('');
const password = ref('');

function handleLogin(){
    router.push('/search');
}
</script>

<template>
<section class="registerPage">
    <div class="google">
        登入
    </div>
    <googleLogin />
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
    div.google{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        
    }
}

</style>
