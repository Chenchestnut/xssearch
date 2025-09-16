<script setup>
import { useAnalysisStore } from '../stores/useAnalysisStore';
import { computed } from 'vue';
const analysisStore = useAnalysisStore();

const wordCloudImg = computed(()=>{
    if(analysisStore.analysis.wordcloud.length > 0){
        return analysisStore.analysis.wordcloud;
    }
    return '';
})
</script>

<template>
    <section>
        <h2 class="title">文字雲</h2>
        <div class="wordcloud">
            <img :src="`data:image/png;base64,${wordCloudImg}`" alt="keyword" v-if="wordCloudImg">
            <div v-else class="no-image">
                <p>暫無文字雲圖片</p>
            </div>
        </div>
    </section>
    <hr>
</template>


<style lang="scss" scoped>
hr{
    width: 85%;
}
h2.title{
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    padding-top:1.5rem ;
    @media screen and (max-width: 520px) {
        font-size: 1.8rem;
    }
}
 div.wordcloud{
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    img{
        width: 75%;
        max-width: 800px;
        min-width: 280px;
        height: auto;
        object-fit: cover; /* 把圖片撐滿容器且不變形 */
        display: block;    /* 消除底部多餘空隙 */
        border-radius: 20px;
    }
    .no-image{
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            font-size: 1.5rem;
            color: #2F2F2F;
        }
    }
}
</style>