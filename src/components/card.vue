<script setup>
import { ref } from 'vue';

const isFlipped1 = ref(false);
const isFlipped2 = ref(false);
const isFlipped3 = ref(false);

function flipCard1() {
    isFlipped1.value = !isFlipped1.value;
}
function flipCard2() {
    isFlipped2.value = !isFlipped2.value;
}
function flipCard3() {
    isFlipped3.value = !isFlipped3.value;
}
</script>

<template>
    <div class="cardContainer">
        <div class="card" :class="{flipped : isFlipped1}" @click="flipCard1">
            <div class="cardFront">
                普通查詢
            </div>
            <div class="cardBack">
                試著輸入你要找的商品型號吧！
            </div>
        </div>
        
        <div class="card" :class="{flipped : isFlipped2}" @click="flipCard2">
            <div class="cardFront">
                個人化推薦
            </div>
            <div class="cardBack">
                如果你還沒有目標
                <br>
                你可以試試輸入你的需求
                <br>
                EX:我想要一台可以打電動的筆電
            </div>
        </div>
        
        <div class="card" :class="{flipped : isFlipped3}" @click="flipCard3">
            <div class="cardFront">
                好物比拚
            </div>
            <div class="cardBack">
                還在煩惱要選擇哪一個嗎？
                <br>
                你可以輸入兩個商品的型號
                <br>
                來比較他們的評價
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
$word-color:#2F2F2F;
.cardContainer{
    perspective: 1000px;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    justify-content: center;
    align-items: center;
    margin: 3rem 3rem 0rem 3rem;

    .card{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 320px;
        height: 250px;
        position: relative;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        cursor: pointer;
        margin: 0.5rem 2rem;
        
        .cardFront,.cardBack{
            position: absolute;
            width: 100%;
            height: 70%;
            border-radius: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $word-color;
            backface-visibility: hidden;
            @media screen and (max-width: 520px) {
                width: 90%;
                height: 60%;
                
            }
        }
        .cardFront{
            font-size: 2.5rem;
            background-color: #D2D5DA;
            box-shadow: #B6BEC9 -0.5rem 0.5rem;
            border-radius: 35px;
            transition: all 0.3s ease;
            
            &:hover{
                transform: scale(1.05);
            }
            @media screen and (max-width: 520px) {
                font-size: 2rem;
                
            }
        }
        .cardBack{
            font-size: 1.25rem;
            text-align: center;
            background-color: #d3d2c7;
            box-shadow: #B5B8A3 -0.5rem 0.5rem;
            border-radius: 35px;
            transform: rotateY(180deg);
            @media screen and (max-width: 520px) {
                font-size: 1rem;
                
            }
        }
    }
}

.card.flipped{
    transform: rotateY(180deg);
}
</style>
