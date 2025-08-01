<script setup>
import { useRouter } from 'vue-router';
import {ref} from 'vue';
import googleLogin from './googleLogin.vue';
const router = useRouter();
const email = ref('');
const password = ref('');

function handleLogin(){
    if(!(email.value && password.value)) {
        alert('請填寫所有欄位');
        return;
    }
    router.push('/search');
}
</script>

<template>
<div class="registerPage">
    <section class="register">
        <h2>登入</h2>
        <hr>
        <form @submit.prevent="handleLogin">
            <label for="Email">Email</label>
            <br>
            <input v-model="email" type="text" placeholder="Email" required class="email">
            <br>
            <label for="password">Password</label>
            <br>
            <input v-model="password" type="password" required class="password">
            <button type="submit" class="submitBtn">登入</button>
        </form>
    </section>
    <section class="login">
        <router-link to="/register" class="loginBtn">立即註冊</router-link>
    </section>
    <section class="other">
        <div class="wrapper">
            <div class="line"><hr></div>
            <div>或</div>
            <div class="line"><hr></div>
        </div>
        <div class="google">
            <googleLogin />
        </div>
    </section>
</div>
    
</template>


<style lang="scss" scoped>
$word-color:#2F2F2F;
.registerPage{
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
    .register{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2{
            margin-top: 5rem;
            font-size: 3rem;
            font-weight: 500;
            @media screen and (max-width: 520px) {
                font-size: 2rem;
                
            }
        }
        hr{
            width: 40%;
            min-width: 250px;
            max-width: 450px;
            border: 0.05rem solid $word-color;
        }
        form{
            width: 40%;
            min-width: 250px;
            max-width: 450px;
            text-align: left;
            label{
                font-size: 2rem;
                text-decoration: solid underline rgba($color: #2F2F2F, $alpha: 0.3) 1.5px;
                @media screen and (max-width: 520px) {
                    font-size: 1.5rem;
                    
                }
            }
            .email,.password{
                width: 100%;
                margin: 2rem 0rem;
                padding: 1rem 0rem 1rem 1rem;
                border: black 1.5px solid;
                border-radius: 20px;
                font-size: 20px;
                background-color: transparent;
                @media screen and (max-width: 520px) {
                    margin: 1rem 0rem;
                    padding: 0.5rem 0rem 0.5rem 1rem;

                }
            }
            .submitBtn{
                width: 100%;
                margin: 2rem 0rem;
                padding: 1rem 0rem;
                align-items: center;
                justify-content: center;
                width: 100%;
                border: none;
                border-radius: 45px;
                text-decoration: none;
                font-size: 1.5rem;
                background-color: #9AA7B8;
                color: #FFFFFF;
                cursor: pointer;
                transition: all 0.3s ease;
                &:hover{
                transform: scale(1.05);
                background-color: #7E90A7;
                }
                @media screen and (max-width: 520px) {
                    font-size: 1.25rem;
                    padding: 0.5rem 0;
                }
            }
        }
    }
    .login{
        display: flex;
        align-items: center;
        justify-content: center;
        color: $word-color;
        p{
            font-size: 1rem;
            margin-right: 1rem;
        }
        .loginBtn{
            font-size: 1rem;
            color: $word-color;
            &:hover{
                color: black;
            }
        }
    }
    .other{
        .wrapper{
            display: flex;
            flex-direction: row;
        }
    }
}

</style>
