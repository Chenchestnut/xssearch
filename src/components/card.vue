<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isFlipped1 = ref(false);
const isFlipped2 = ref(false);
const isFlipped3 = ref(false);
const windowWidth = ref(window.innerWidth);
const isComputer = computed(()=>windowWidth.value > 768)
const handleResize=()=>{
    windowWidth.value = window.innerWidth;
}

onMounted(()=>{
    window.addEventListener('resize',handleResize);
})

onUnmounted(()=>{
    window.removeEventListener('resize',handleResize);
})

function flipCard1() {
    isFlipped1.value = !isFlipped1.value;
}
function flipCard2() {
    isFlipped2.value = !isFlipped2.value;
}
function flipCard3() {
    isFlipped3.value = !isFlipped3.value;
}
//電腦版滑鼠移入翻轉
function cardHover(index){
    if(isComputer.value){
        switch(index){
            case 1:
                flipCard1();
                break;
            case 2:
                flipCard2();
                break;
            case 3:
                flipCard3();
                break;
        }
    }
    
}
//非電腦版點擊翻轉
function cardClick(index){
    if(!isComputer.value){
        switch(index){
            case 1:
                flipCard1();
                break;
            case 2:
                flipCard2();
                break;
            case 3:
                flipCard3();
                break;
        }
    }
    
}
</script>

<template>
    <div class="cardContainer">
        <div class="card" :class="{flipped : isFlipped1}" @click="cardClick(1)" @mouseenter="cardHover(1)" @mouseleave="cardHover(1)">
            <div class="cardFront">
                普通查詢
            </div>
            <div class="cardBack">
                <div class="text">
                    試著輸入你要找的商品名稱
                    <br>
                    讓我們幫你分析他的優缺點
                    <br>
                    做出評論總結
                </div>
                <div class="gopage" @click="router.push('/search')">
                    馬上體驗
                </div>
            </div>
        </div>

        <div class="card" :class="{flipped : isFlipped2}" @click="cardClick(2)" @mouseenter="cardHover(2)" @mouseleave="cardHover(2)">
            <div class="cardFront">
                個人化推薦
                <span class="recommend"><i class="fa-solid fa-crown"></i>付費功能</span>
            </div>
            <div class="cardBack">
                <div class="text">
                    如果你還沒有目標
                    <br>
                    你可以試試輸入你的需求
                    <br>
                    EX:我想要一台可以打電動的筆電，適合拍照的手機
                </div>
                <div class="gopage" @click="router.push('/recommend')">
                    馬上體驗
                </div>
            </div>
        </div>

        <!-- <div class="card" :class="{flipped : isFlipped3}" @click="cardClick(3)" @mouseenter="cardHover(3)" @mouseleave="cardHover(3)">
            <div class="cardFront">
                好物比拚
            </div>
            <div class="cardBack">
                還在煩惱要選擇哪一個嗎？
                <br>
                你可以輸入兩個同類別商品的型號
                <br>
                對他們進行全方位的比較
            </div>
        </div> -->
    </div>
</template>


<style lang="scss" scoped>
$word-color:#2F2F2F;
.cardContainer{
    // perspective: 1000px;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    justify-content: center;
    align-items: center;
    margin: 3rem 3rem 0rem 3rem;
    @media screen and (max-width: 500px) {
        margin: 3rem 0rem 0rem 0rem; 
    }
    .card{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 320px;
        height: 280px;
        position: relative;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        cursor: pointer;
        margin: 0.5rem 3rem;
        @media screen and (max-width: 500px) {
            margin: 0.3rem 0rem;
        }
        
        .cardFront,.cardBack{
            position: absolute;
            width: 100%;
            height: 85%;
            border-radius: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $word-color;
            backface-visibility: hidden;
            @media screen and (max-width: 520px) {
                width: 90%;
                height: 70%;
            }
        }
        .cardFront{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 2.5rem;
            background-color: #D2D5DA;
            box-shadow: #B6BEC9 -0.5rem 0.5rem;
            border-radius: 35px;
            transition: all 0.3s ease;
            &:hover{
                transform: scale(1.05);
            }
            @media screen and (max-width: 520px) {
                font-size: 1.5rem;
            }
            span.recommend{
                transform: translateX(5);
                font-size: 1rem;
                margin-left: 0.5rem;
                color: darken(#d88f8a, 20%);
                @media screen and (max-width: 520px) {
                    font-size: 0.8rem;
                }
                i{
                    margin-right: 0.5rem;
                    color: #d88f8a;
                }
            }
        }
        .cardBack{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #d3d2c7;
            box-shadow: #B5B8A3 -0.5rem 0.5rem;
            border-radius: 35px;
            transform: rotateY(180deg);
            div.text{
                font-size: 1.25rem;
                text-align: center;
                line-height: 1.4;
                @media screen and (max-width: 520px) {
                font-size: 1rem; 
                }
            }
            .gopage{
                position:absolute;
                bottom: 1rem;
                margin-top: 1.5rem;
                padding: 0.5rem 1rem;
                background-color: #B5B8A3;
                box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
                border: none;
                border-radius: 20px;
                font-size: 1rem;
                color: $word-color;
                cursor: pointer;
                transition: all 0.3s ease;
                &:hover{
                    background-color: darken(#B5B8A3, 5%);
                }
                @media screen and (max-width: 520px) {
                font-size: 0.8rem;
                padding: 0.3rem 0.8rem;
                }
            }
        }
    }
}

.card.flipped{
    transform: rotateY(180deg);
}
</style>
