<script setup>
import Navbar from './Navbar.vue';
import CompareProductCard from './CompareProductCard.vue';
import Specification from './Specification.vue';
import { onMounted, reactive, ref } from 'vue';
import { useAnimations } from '../composables/useAnimations';

const compareTitle = reactive(['對比結果', '基本規格', '其他評價']);
const navBarHight = ref(0);
const offset = ref(0);
const { fadeIn } = useAnimations();

onMounted(()=>{
    fadeIn('.compareResult');
    const navbarElement = document.querySelector('.navbar');
    if(navbarElement){
        navBarHight.value = navbarElement.offsetHeight;
        offset.value = navBarHight.value;
    }
    console.log(navBarHight.value);
})
function handleScroll(index){
    const section = document.getElementById(`section${index}`);
    const elementPosition = section.offsetTop-offset.value
    if (!section) return;
    console.log(section);
    window.scrollTo({ top: elementPosition, behavior: 'smooth'});
}
</script>

<template>
    <div class="compareResult">
        <Navbar />
        <section class="img">
            <CompareProductCard />
        </section>
        <section class="content">
            <div class="navBar">
                <ul>
                    <li v-for="(title,index) in compareTitle" :key="index" @click="handleScroll(index)" class="navItem">{{ title }}</li>
                </ul>
            </div>
            <div class="compareInfo" id="section0">
                <div class="title">
                    <h2>{{ compareTitle[0] }}</h2>
                    <h3>相機</h3>
                    <div class="discription">
                        <p>這裡是對比資訊的內容</p>
                    </div>
                </div>
            </div>
            <div class="specificationInfo" id="section1">
                <div class="title">
                    <h2>{{ compareTitle[1] }}</h2>
                </div>
                <div class="discriptionFormat">
                    <Specification />
                    <Specification />
                </div>
            </div>
            <div class="other" id="section2">
                <div class="title">
                    <h2>{{ compareTitle[2] }}</h2>
                    <div class="discription">
                        <p>這裡是其他評價的內容</p>
                    </div>
                </div>
            </div>
        </section>
    </div>


</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.compareResult {
    background-image: url('../assets/backGround2.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    width: 100vw;
    color: $word-color;
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2{
            font-size: 2rem;
            font-weight: 500;
            text-align: left;
            margin-top: 2rem;
            @media screen and (max-width: 520px) {
                font-size: 1.8rem;
            }
        }
        h3{
            font-size: 1.5rem;
            font-weight: 400;
            text-align: left;
            margin-top: 0.5rem;
            @media screen and (max-width: 520px) {
                font-size: 1.2rem;
            }
        }
        div.navBar{
            background-color: #b6bec9;
            width: 80%;
            border-radius: 35px;
            margin-top: 2rem;
            margin-bottom: 2rem;    
            ul{
                display: flex;
                justify-content: center;
                font-size: 1.3rem;
                margin: 0.8rem 0;
                padding: 0;
                @media screen and (max-width: 600px) {
                    font-size: 1rem;
                }
                @media screen and (max-width: 480px) {
                    font-size: 0.8rem;
                }
                li{
                    list-style: none;
                    margin: 0 2rem;
                    padding: 0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    &:hover{
                        color: black;
                        text-decoration: underline;
                    }
                }
            }
        }
        div.compareInfo{
            display: flex;
            flex-direction: column;
            // align-items: flex-start;
            // justify-content:start;
            width: 75%;
            
        }
        div.specificationInfo{
            display: flex;
            flex-direction: column;
            width: 75%;
            div.discriptionFormat{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-evenly;
            }

        }
        div.other{
            display: flex;
            flex-direction: column;
            width: 75%;
        }

        div.title{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                width: 100%;
                div.discription{
                    display: flex;
                    align-items: center;
                    justify-content: start;
                    width: 100%;
                    background-color: white;
                    border: #decac2 1px solid;
                    border-radius: 20px;
                    padding: 1rem 1.5rem;
                    margin-top: 1.5rem;
                    p{
                        text-align: left;
                        font-size: 1.15rem;
                    }
                }
            }
    }
}
</style>
