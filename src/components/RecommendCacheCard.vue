<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const router = useRouter();

const props = defineProps({
    name:String,
    img:String,
    reason:String,
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
</script>

<template>
    <div class="recommendCacheCard">
        <div class="imgBox">
            <img :src="props.img" alt="商品圖片" @error="imageError">
        </div>
        <div class="briefDescription">
            <h2>{{props.name}}</h2>
            <p>{{ props.reason }}</p>
            <!-- <i class="fa-brands fa-adversal ad"></i> -->
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
    margin: 3rem 1rem 0 1rem;
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
