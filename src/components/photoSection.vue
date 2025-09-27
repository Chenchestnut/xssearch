<script setup>
import { ref } from 'vue';
import StarDescription from './StarDescription.vue';
const props = defineProps({
    img:String,
})

const displayStarDescription = ref(false);

function showStarDescription(){
    displayStarDescription.value = true;
}

function hideStarDescription(){
    displayStarDescription.value = false;
}
</script>

<template>
    <section class="sideBar">
        <div class="stickyWrap">
            <div class="img">
                <div class="imgBox">
                    <img :src="props.img" alt="商品圖片">
                </div>
                <p class="productName">iPhone 16</p>
                <p class="star" @mouseenter="showStarDescription" @mouseleave="hideStarDescription">綜合星等：4.5<i class="fa-regular fa-star"></i><StarDescription v-if="displayStarDescription"/></p>
            </div>
        </div>
    </section>
    <hr>
</template>


<style lang="scss" scoped>
hr{
    width: 85%;
}
.sideBar{
    text-align: center;
    margin: 2.5rem;
    flex-shrink: 0; // 防止側邊欄被壓縮
    // width: 80%;
    .stickyWrap{
        position: sticky;
        top: 135px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .imgBox{
        width: 200px;      /* 確保寬高一致 */
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
            img{
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }
        .productName{
            font-size: 2.5rem;
            font-weight: bold;
            margin-top: 1rem;
        }
        .star{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: 1.3rem;
            margin-top: 0.5rem;
            margin-bottom: 1rem;
            &:hover{
                cursor: pointer;
            }
            i{
                color: #d88f8a;
                margin-left: 0.2rem;
            }
        }
    }
    
}
</style>