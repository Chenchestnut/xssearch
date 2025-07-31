<script setup>
import { useRouter } from 'vue-router';
import { useInputStore } from '../stores/useInputStore';
import { useAnimations } from '../composables/useAnimations';
import { onMounted } from 'vue';
const { fadeIn2 } = useAnimations();
const inputStore = useInputStore();
let name = inputStore.text.slice(1);

const router = useRouter();
function changeToCompare() {
    router.push('/compare');
}

onMounted(()=>{
    fadeIn2('.card');
})
</script>

<template>
    <div class="membership">
        <div class="personal">
                <div class="avatar">
                    <p>{{ name }}</p>
                </div>
                <i class="fa-solid fa-chevron-down"></i>
        </div>
        <h1>提升你的使用體驗</h1>
        <div class="card">
            <div class="free">
                <div class="price">
                    <span>Free</span>
                    <h2>0</h2>
                    <span class="unit">TW/月</span>
                </div>
                <hr>
                <button>目前使用</button>
                <ul>
                    <li><i class="fa-solid fa-check"></i>基本查詢</li>
                    <li><i class="fa-solid fa-check"></i>資料分析</li>
                    <li><i class="fa-solid fa-check"></i>個人化推薦</li>
                </ul>
            </div>
            <div class="member">
                <div class="price">
                    <span>Pro</span>
                    <h2>100</h2>
                    <span class="unit">TW/月</span>
                </div>
                <hr>
                <button  @click="changeToCompare">立即取得</button>
                <ul>
                    <li><i class="fa-solid fa-check"></i>基本查詢</li>
                    <li><i class="fa-solid fa-check"></i>資料分析</li>
                    <li><i class="fa-solid fa-check"></i>個人化推薦</li>
                    <li><i class="fa-solid fa-check"></i>商品對比</li>
                </ul>
            </div>
        </div>
        
    </div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.membership {
background-image: url('../assets/backGround3.png');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed;
min-height: 100vh;
width: 100%;
color: $word-color;
    .personal{
            display: flex;
            justify-content: right;
            align-items: flex-end;
            padding: 1.5rem 3rem;
            .avatar{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 80px;
                background-color: #B5B8A3;
                border-radius: 50%;
                margin-right: 0.5rem;
                p{
                    color: $word-color;
                    text-align: center;
                    font-size: 1.5rem;
                }
            }
            i{
                color: white;
            }
    }
    h1{
        font-size: 2.5rem;
        font-weight: 450;
        text-align: center;
        margin: 2rem 0 1rem 0;
        @media screen and (max-width: 520px) {
            font-size: 2rem;
        }
        
    }
    div.card{
        display: flex;
        flex-wrap: wrap;
        flex: 0 1 auto;
        justify-content: space-evenly;
        align-items: center;
        margin: 5rem 2rem;
        @media screen and (max-width: 900px) {
            margin: 3rem 0;
        }
        .free,.member{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 20%;
            min-width: 280px;
            height: 45vh;
            background-color: #D2D5DA;
            border-radius: 35px;
            padding:2rem 2rem;
            @media screen and (max-width: 520px) {
                padding: 1.5rem 1.5rem;
                
            }
            div.price{
                display: flex;
                span{
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                h2{
                    font-size: 2.5rem;
                    font-weight: bold;
                    padding-top: 1rem;
                }
                span.unit{
                    font-size: 1.2rem;
                    padding-top: 2rem;
                    padding-left: 0.5rem;
                    color: rgba(47, 47, 47, 0.5);
                }
            }
            ul{
                list-style: none;
                li{
                    font-size: 1.2rem;
                    padding: 0.5rem 0;
                    text-align: left;
                    i{
                        color: #CC5F5A;
                        padding-right: 0.5rem;
                    }
                }
            }
            button{
                font-size: 1.3rem;
                border: none;
                border-radius: 35px;
                padding: 0.5rem 1rem;
                
            }
        }
        div.free{
            h2{
                font-size: 2.5rem;
                font-weight: bold;
            }
            button{
                cursor: not-allowed;
                color: #a5a5a3;
                background-color: #efece9;

            }
        }
        div.member{
            padding: 2rem 2rem 1rem 2rem;

            @media screen and (max-width: 560px) {
                margin-top: 1rem;
            }
            button{
                cursor: pointer;
                background-color: #D4B2A8;
                transition: all 0.3s ease;
                &:hover{
                    background-color: #dea7a2;
                }
            }
        }
    }
}
</style>
