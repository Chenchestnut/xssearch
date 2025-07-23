<script setup>
import { useSearchStore } from '../stores/useSearchStore';
const searchStore = useSearchStore();
const props = defineProps({
    platform: {
        type: String,
        default: 'momo'
    }
});

// const currentPlatform = ref('momo')

</script>

<template>
<div class="commentElement" v-for="(i, index) in searchStore[`${props.platform}Reviews`]" :key="index">
    <div class="avatar"></div>
    <div class="content">
        <p>User：大強</p>
        <div class="star">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        </div>
        <p>{{ i.comment }}</p>
    </div>
</div>
</template>


<style  lang="scss" scoped>
$word-color:#2F2F2F;
.commentElement{
    display: flex;
    flex-direction: row;
    // justify-content: center;
    width: 60%;
    min-width: 250px;
    border-radius: 35px;
    padding: 1.5rem 1rem;
    // margin-bottom: 1.5rem;
    background-color: #caccd3;
    color: $word-color;
    .avatar{
        width: 40px;
        height: 40px;
        background-color: #B5B8A3;
        border-radius: 50%;
        margin-right: 0.5rem;
    }
    .content{
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: flex-start;
        text-align: left;
        p{
            font-size: 1rem;
            padding: 0.5rem 0;
            @media screen and (max-width: 520px) {
                font-size: 0.9rem;
            }
        }
        .star{
            display: flex;
            i{
                color: #d88f8a;
                padding-right: 0.2rem;
            }
        }
    }
}

</style>
