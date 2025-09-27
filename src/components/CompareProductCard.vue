<script setup>
// import { Icon } from '@iconify/vue';
import { useAnimations } from '../composables/useAnimations';
import { onMounted } from 'vue';
import StarDescription from './StarDescription.vue';
import { ref } from 'vue';

const { medalAnimation, winnerAnimation, delayedAnimation, hoverInfoAnimation } = useAnimations();
onMounted(async () => {
    // 等待 winnerContainer 動畫完成
    await delayedAnimation(() => winnerAnimation('.winnerContainer'), 500);
    
    // winnerContainer 動畫完成後，立即開始 medal 動畫
    delayedAnimation(() => medalAnimation('.medal'), 50);
});

const displayStarDescription = ref(false);

function showStarDescription(){
    displayStarDescription.value = true;
    hoverInfoAnimation('.starDescription');
}

function hideStarDescription(){
    displayStarDescription.value = false;
}
</script>

<template>
    <div class="compareProductCard">
        <div class="winnerContainer">
            <i class="fa-solid fa-medal medal"></i>
            <!-- <Icon icon="solar:medal-ribbons-star-bold-duotone" :width="48" :height="48" color="#eab308" class="medal"/> -->
            <div class="imgBox">
                <img src="../assets/iphone.jpg" alt="商品圖片">
            </div>
            <div class="info">
                <h2>iphone 15 pro max</h2>
                <p class="star" @mouseenter="showStarDescription" @mouseleave="hideStarDescription"><i class="fa-regular fa-star"></i>4.0<StarDescription class="starDescription" v-if="displayStarDescription" /></p>
            </div>
        </div>
        <div class="vs">
            VS
        </div>
        <div class="container">
            <div class="imgBox">
                <img src="../assets/iphone.jpg" alt="商品圖片">
            </div>
            <div class="info">
                <h2>iphone 15 pro max</h2>
                <p class="star" @mouseenter="showStarDescription" @mouseleave="hideStarDescription"><i class="fa-regular fa-star"></i>4.0<StarDescription class="starDescription" v-if="displayStarDescription" /></p>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
// hr{
//     width: 85%;
//     margin: 0;
// }
.compareProductCard {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 2rem;
    align-items: center;
    color: $word-color;
    margin-top: 2rem;
    @media screen and (max-width: 680px) {
        flex-direction: column;
    }
    div.container, div.winnerContainer{
        position: relative;
        display: flex;
        background-color: white;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        // width: 30%;
        min-width: 250px;
        max-width: 600px;
        padding: 1rem;
        margin: 1.5rem 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        .starDescription{
            position: absolute;
            top: 85%;
            left: 25%;
            z-index: 10;
        }
        .medal{
            position: absolute;
            top: 0rem;
            left: 0rem;
            font-size: 4.5rem;
            rotate: -20deg;
            color: #FFEE8D;
            opacity: 0;
            transform: translateY(-30px) scale(0);
            visibility: hidden; // 完全隱藏
        }
        div.imgBox{
            width: 200px;
            height: 200px;
            // min-width: 160px;
            overflow: hidden;
            border-radius: 50%;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        div.info{
            width: 100%;
            text-align: left;
            margin-top: 1rem;
            h2{
                font-size: 1.5rem;
                font-weight: bold;
                @media screen and (max-width: 740px) {
                    font-size: 1.2rem;
                }
                @media screen and (max-width: 520px) {
                    font-size: 1rem;
                }
            }
            p.star{
                &:hover{
                    cursor: pointer;
                }
                i{
                    color: #CC5F5A;
                }
            }
        }
    }
    div.vs{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        background: rgba(126, 144, 167, 0.3);
        border: #b7bdc8 solid 1px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        // margin: 0 6.5rem;
        // @media screen and (max-width: 768px) {
        //     font-size: 1.5rem;
        // }
        @media screen and (max-width: 520px) {
            font-size: 1.5rem;
        }
    }
}

</style>
