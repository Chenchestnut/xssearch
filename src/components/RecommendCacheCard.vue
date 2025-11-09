<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function handleToRecommendResult(){
    router.push('/recommendResult');
}
</script>

<template>
    <div class="recommendCacheCard" @click="handleToRecommendResult">
        <div class="imgBox">
            <img src="../assets/asus.jpg" alt="商品圖片">
        </div>
        <div class="briefDescription">
            <h2>華碩 ASUS ROG Strix G15</h2>
            <p>理由：我買了ASUS ROG Strix G15覺得超值，跑大型遊戲像是《LOL》和《APEX》都很順不卡，鍵盤RGB燈效也很帥，散熱做得不錯，打遊戲時機身不會過熱影響操作，螢幕更新率高，看起來超順眼，對喜歡玩遊戲的人來說真的很夠用，CP值很高，推薦給想要入門電競筆電的人。</p>
            <i class="fa-brands fa-adversal ad"></i>
        </div>
        
    </div>

</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;

.recommendCacheCard {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: $word-color;
    margin: 2.5rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    max-height: 250px; 
    &:hover{
        transform: scale(1.05);
    }
    .imgBox{
        max-width: 280px;
        max-height: auto;
        overflow: hidden;
        // border-bottom-left-radius: 35px;
        border-top-left-radius: 35px;
        img{
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    }
    .briefDescription{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        background-color: #d3d3c7;
        width: 50%;
        border-bottom-right-radius: 35px;
        padding: 1rem 2rem;
        h2{
            font-size: 1.8rem;
            font-weight: 500;
        }
        h3{
            font-size: 1.3rem;
            font-weight: 500;
            margin-top: 0.5rem;
            i{
                color: #d88f8a;
            }
        }
        p{
            font-size: 1.15rem;
            margin-top: 0.5rem;
            overflow: scroll;
            scrollbar-color: #ffff #B5B8A3;
            scrollbar-width: thin;
        }
        i.ad{
            position: absolute;
            z-index: 10;
            top: 0;
            right: 0;
            color: #d88f8a;
        }
    }
}
@media screen and (max-width: 900px) {
    .recommendCacheCard {
        max-height: 200px;
        min-width: 650px;
        .imgBox{
            max-width: 160px;
        }
        .briefDescription{
            h2{
                font-size: 1.4rem;
            }
            h3{
                font-size: 1.1rem;
            }
            p{
                font-size: 1rem;
            }
        }
    }
}
@media screen and (max-width: 600px) {
    .recommendCacheCard {
        max-height: 180px;
        min-width: 530px;
        .imgBox{
            max-width: 130px;
        }
        .briefDescription{
            h2{
                font-size: 1.2rem;
            }
            h3{
                font-size: 1rem;
            }
            p{
                font-size: 0.8rem;
            }
        }
    }
}
@media screen and (max-width: 500px) {
    .recommendCacheCard {
        max-height: 180px;
        min-width: 290px;
        .imgBox{
            display: none;
        }
        .briefDescription{
            width: 100%;
            border-top-left-radius: 35px;
            h2{
                font-size: 1.2rem;
            }
            h3{
                font-size: 1rem;
            }
            p{
                font-size: 0.8rem;
            }
        }
    }
    
}
</style>
