<script setup>
import card from './card.vue';
import { ref } from 'vue';

const isClicked = ref(false);
function toggleLogin(){
    isClicked.value = !isClicked.value;
}
</script>

<template>
<div class="homePage">
    
    <header>
        <div class="logo">
            <img src="../assets/logo.jpeg" alt="LOGO">
            <h2>XSSearch</h2>
        </div>
        <div class="avater">
            <i class="fa-regular fa-user" @click="toggleLogin"></i>
            <div class="logIn" v-if="isClicked">
                <router-link to="/login" class="loginBtn">登入</router-link>
                <router-link to="/register" class="registerBtn">註冊</router-link>  
            </div>
        </div>
    </header>
    <section class="content">
        <h1>快速整合3C商品評價</h1>
        <div class="cardContainter">
            <card />
        </div>
    </section> 
    <section class="start">
        <router-link to="/search" class="startBtn">立即開始</router-link>
    </section>
    
</div>
</template>

<style lang="scss" scoped>
$word-color:#2F2F2F;


.homePage {
margin: 0;
padding: 0;
background-image: url('../assets/background.png');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
min-height: 100vh;
width: 100vw;
background-attachment: fixed;
top: 0;
left: 0;
color: $word-color;
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 5rem;
        @media screen and (max-width: 520px) {
            padding: 2rem 1rem;
        }
        .logo {
            display: flex;
            align-items: center;
            justify-content: start;
            // margin-left: auto;

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                margin-right: 10px;
                border: 1px solid #B5B8A3;
            }

            h2 {
                font-size: 24px;
                color: $word-color;
            }
        }
        .avater {
            display: flex;
            align-items: center;
            position: relative;
            font-size: 1.5rem;
            color: $word-color;
            cursor: pointer;
            i {
                padding: 0.8rem;
                background-color: #9AA7B8;
                border-radius: 50%;
                margin-right: 1rem;
            }
            .logIn {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: absolute;
                width: auto;
                min-width: 120px;
                float: right;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10;
                background-color: #dddbde;
                padding: 1rem;
                margin-top: 1rem;
                border-radius: 35px;
                .loginBtn, .registerBtn {
                    // margin-right: auto;
                    padding: 0.5rem 1.5rem;
                    border-radius: 50px;
                    font-size: 1rem;
                    cursor: pointer;
                    font-family: inherit;
                    text-decoration: none;
                }

                .loginBtn {
                    margin-bottom: 0.5rem;
                    background-color: #9AA7B8;
                    border: 3px solid #9AA7B8;
                    color: #FFFFFF;

                    &:hover {
                        border: 3px solid #7E90A7;
                        background-color: transparent;
                        color: $word-color;
                    }
                }

                .registerBtn {
                    // margin-right: 5rem;
                    background-color: transparent;
                    border: 3px solid #9AA7B8;
                    color: #2F2F2F;
                    box-shadow: inset 0 0 0 0 #9AA7B8;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: #9AA7B8;
                        color: #FFFFFF;
                        box-shadow: inset 0 0 0 3px #9AA7B8;
                    }
                }
            }
        }
    }
    

    section.content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h1{
            font-size: 3rem;
            font-weight: bold;
            margin-top: 1.5rem;
        }
        @media screen and (max-width: 768px) {
            h1 {
                font-size: 2rem;
            }
            
        }
    }
    section.start{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .startBtn{
            margin: 2rem;
            padding: 1rem 5rem;
            width: 45%;
            min-width: 260px;
            font-size: 1.5rem;
            background-color: #E2D0C8;
            text-decoration: none;
            text-align: center;
            border-radius: 45px;
            transition: all 0.3s ease;
            color: $word-color;
            &:hover{
                transform: scale(1.05);
                background-color: #D4B2A8;
            }
        }
    }
}

</style>
