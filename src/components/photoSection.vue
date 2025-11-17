<script setup>
import { computed, ref } from 'vue';
import StarDescription from './StarDescription.vue';
const props = defineProps({
    img:String,
    name:String,
})

function changeURL(url){
    return url.replace('originals','236x')
}
const imageError = (event) => {
    event.target.src = changeURL(props.img);
    event.target.alt = '暫無商品圖片';
}

const imgUrl = computed(()=>{
    if(!props.img || props.img === '' || props.img === '商品圖片'){
        return defaultImage;
    }else{
        return props.img;
    }
});

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
                    <img :src="props.img" alt="商品圖片" @error="imageError">
                </div>
            </div>
            <p class="productName">{{props.name}}</p>
            <!-- <p class="star" @mouseenter="showStarDescription" @mouseleave="hideStarDescription">綜合星等：4.5<i class="fa-regular fa-star"></i><StarDescription class="starDescription" v-if="displayStarDescription"/></p> -->
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
                height: 100vh;
                object-fit: cover;
            }
        }
        .productName{
            font-size: 2.5rem;
            font-weight: bold;
            margin-top: 1rem;
        }
        .star{
            position: relative;
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
            .starDescription{
                position: absolute;
                top: 0;
                left: 100%;
                z-index: 10;
            }
        }
    }
    
}
</style>