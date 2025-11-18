<script setup>
import { useSearchStore } from '../stores/useSearchStore';
import { useAnalysisStore } from '../stores/useAnalysisStore';
import { ref } from 'vue';
const searchStore = useSearchStore();
const analysisStore = useAnalysisStore();
const isCollapse = ref({});
// const mobile01Reviews = analysisStore.mobile01Reviews;
const props = defineProps({
    platform: {
        type: String,
        default: 'mobile01'
    },
    comments:{
        type: Array,
        default: () => [0,1,2]
    }
});
// console.log(`${props.platform}Reviews:`, searchStore[`${props.platform}Reviews`]);
// console.log('platform 值:', props.platform);
const textLimit = 300;
function showMask(comment){
    return comment.length > textLimit;
}
function toggleCollapsed(index){
    if(!(index in isCollapse.value)) {
        isCollapse.value[index] = true;
    }
    isCollapse.value[index] = !isCollapse.value[index];
}

function getCollapseState(index){
    return isCollapse.value[index] !== false
}
// const currentPlatform = ref('momo')

</script>

<template>
<div class="commentElement" v-for="(comment, index) in props.comments" :key="index">
    <div class="avatar"></div>
    <div class="content" v-if="props.comments.length > 0">
        <p>User：使用者</p>
        <div class="maskDistrict" :class="{collapse: getCollapseState(index) && showMask(comment)}">
            <p @click="toggleCollapsed(index)">{{ comment }}</p>
            <div v-if="getCollapseState(index) && showMask(comment)" class="mask" @click="toggleCollapsed(index)"></div>
        </div>
    </div>
    <div class="content" v-if="props.comments.length === 0">
        <p>暫時沒有相關評論</p>
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
    min-width: 290px;
    border-radius: 35px;
    padding: 1.5rem 1rem;
    // margin-bottom: 1.5rem;
    background-color: #caccd3;
    color: $word-color;
    .avatar{
        border-left: #B5B8A3 solid 1px;
        margin-right: 0.5rem;
        height: 4vh;
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
            // cursor: pointer;
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
        .maskDistrict{
            position: relative;
            div.mask{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 150px;
                background: linear-gradient(rgba(255, 255, 255, 0), #caccd3);
                cursor: pointer;
            }
        }
        .maskDistrict.collapse{
            max-height: 8rem;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
    }
    
}

</style>
