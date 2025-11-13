<script setup>
import Navbar from './Navbar.vue';
import RecommendCacheCard from './RecommendCacheCard.vue';
import { useAlert } from '../SweetAlert';
import axios from 'axios';
import { useRouter } from 'vue-router';
import{ useIndexStore } from '../stores/useIndexStore';
import { useRecommendStore } from '../stores/useRecommendStore';
import { useAnalysisStore } from '../stores/useAnalysisStore';
const { showLoading, closeLoading} = useAlert();
const recommendStore = useRecommendStore();
const indexStore = useIndexStore();
const analysisStore = useAnalysisStore();
const router = useRouter();

function getIdIndex(index){
  indexStore.setIndex(index);
}

function handleAnalysis(index){
  getIdIndex(index);
  //接分析
  console.log(recommendStore.recommendation[index].name, recommendStore.recommendation[index].id);
  showLoading('努力分析中...')
  try{
        updateLoading(5);
        const response = await axios.post(
            'https://api-xssearch.brid.pw/api/analysis/',
            {"keyword":recommendStore.recommendation[index].name,
            "product_id": recommendStore.recommendation[index].id},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                onDownloadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        // 將下載進度映射到 10% - 80%
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 70) / progressEvent.total + 10
                        );
                        updateLoading(percentCompleted);
                        console.log('下載進度:', percentCompleted);
                    } else {
                        // 如果沒有 total，使用假進度
                        updateLoading(50);
                    }
                }
            }
        );

        const data = response.data;
        console.log(data);
        updateLoading(85);  // 資料處理中
        analysisStore.saveAnalysisResults(data);
        updateLoading(95);
        // 稍微延遲，讓進度條到達 100%
        await new Promise(resolve => setTimeout(resolve, 200));
        updateLoading(100);
        
        // 再延遲一下讓使用者看到 100%
        await new Promise(resolve => setTimeout(resolve, 300));
        closeLoading()
        router.push('/recommendResult')
    }catch(error){
        console.error(error);
        closeLoading()
        showWarning("資訊載入錯誤，請重新嘗試");
    }
}
</script>

<template>
    <div class="recommendPageCache">
        <Navbar />
        <RecommendCacheCard v-for="(item, index) in recommendStore.recommendation" :key="item.id" :item="item"  :name="item.name" :img="item.img" :reason="item.reason" @click="handleAnalysis(index)"/>
    </div>

</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.recommendPageCache {
    background-image: url('../assets/backGround2.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    width: 100vw;
    color: $word-color;
}
</style>
