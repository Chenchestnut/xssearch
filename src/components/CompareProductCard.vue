<script setup>
// import { Icon } from '@iconify/vue';
import { useAnimations } from '../composables/useAnimations';

const { medalAnimation, winnerAnimation, delayedAnimation} = useAnimations();
await delayedAnimation(() => winnerAnimation('.winnerContainer'), 500);
delayedAnimation(() => medalAnimation('.medal'), 100);
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
                <p class="star"><i class="fa-regular fa-star"></i>4.0</p>
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
                <p class="star"><i class="fa-regular fa-star"></i>4.0</p>
            </div>
        </div>
    </div>
    <hr>

</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
hr{
    width: 85%;
}
.compareProductCard {
    display: flex;
    // flex-wrap: wrap;
    // flex: 0 1 auto;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    color: $word-color;
    margin-top: 2rem;
    gap: 2rem;
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
        .medal{
            position: absolute;
            top: 0rem;
            left: 0rem;
            font-size: 4.5rem;
            rotate: -20deg;
            color: #FFEE8D;
        }
        div.imgBox{
            width: 200px;
            height: 200px;
            // min-width: 160px;
            overflow: hidden;
            border-radius: 50%;
            @media screen and (max-width: 620px) {
                height: 300px;
            }
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
                font-weight: 500;
                @media screen and (max-width: 740px) {
                    font-size: 1.2rem;
                }
                @media screen and (max-width: 520px) {
                    font-size: 1rem;
                }
            }
            p.star{
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
        background-color: #a4aebd;
        border: #7e90a7 solid 1px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 0 1.5rem;
        @media screen and (max-width: 520px) {
            font-size: 1.5rem;
        }
    }
}

</style>
