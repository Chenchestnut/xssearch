<script setup>
import Navbar from './Navbar.vue';
import RecommendCacheCard from './RecommendCacheCard.vue';
import { useAlert } from '../SweetAlert';
import axios from 'axios';
import { useRouter } from 'vue-router';
import{ useIndexStore } from '../stores/useIndexStore';
import { useRecommendStore } from '../stores/useRecommendStore';
import { useAnalysisStore } from '../stores/useAnalysisStore';
const { showLoading, closeLoading, updateLoading, showWarning } = useAlert();
const recommendStore = useRecommendStore();
const indexStore = useIndexStore();
const analysisStore = useAnalysisStore();
const router = useRouter();

function getIdIndex(index){
  indexStore.setIndex(index);
}

async function handleAnalysis(index){
  getIdIndex(index);
  //接分析
  console.log(recommendStore.recommendation[index].name, recommendStore.recommendation[index].id);
  showLoading('努力分析中...')

  let currentProgress = 5;
    let progressInterval = null;
    
    const startSimulatedProgress = () => {
        progressInterval = setInterval(() => {
            if (currentProgress < 95) {
                // 使用緩動函數，越接近 95% 增長越慢
                const increment = (95 - currentProgress) * 0.01;
                currentProgress += Math.max(increment, 0.1);
                updateLoading(Math.floor(currentProgress));
            }
        }, 200);
    };
  try{
        updateLoading(5);
        startSimulatedProgress();
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
                      if (progressInterval) {
                          clearInterval(progressInterval);
                          progressInterval = null;
                      }
                        // 將下載進度映射到 10% - 80%
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 70) / progressEvent.total + 10
                        );
                        currentProgress = percentCompleted;
                        updateLoading(percentCompleted);
                        console.log('下載進度:', percentCompleted);
                    } else {
                        // 如果沒有 total，使用假進度
                        console.log('使用模擬進度，當前:', Math.floor(currentProgress));
                    }
                }
            }
        );
        // 清除模擬進度
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
        const data = response.data;
        console.log('分析回應資料:', data);
        
        // 檢查回應中是否包含 Gemini 繁忙訊息
        if (data.analysis?.summary?.includes('當前Gemini API 過於繁忙')) {
            console.log('從回應數據中檢測到 Gemini 繁忙，顯示警告');
            closeLoading();
            showWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
            return;
        }

        updateLoading(75);  // 資料處理中
        await new Promise(resolve => setTimeout(resolve, 100));

        updateLoading(85);  // 資料處理中
        analysisStore.saveAnalysisResults(data);
        await new Promise(resolve => setTimeout(resolve, 100));

        updateLoading(95);
        await new Promise(resolve => setTimeout(resolve, 150));

        updateLoading(100);
        await new Promise(resolve => setTimeout(resolve, 300));
        closeLoading()
        router.push('/recommendResult')
    }catch(error){
        if (progressInterval) {
          clearInterval(progressInterval);
          progressInterval = null;
        }
        console.error('=== 錯誤詳細信息 ===');
        console.error('完整錯誤物件:', error);
        console.error('錯誤狀態碼:', error.response?.status);
        console.error('錯誤資料:', error.response?.data);
        console.error('錯誤訊息:', error.message);
        console.error('=================');
        closeLoading()
        
        // 檢查是否為 429 錯誤 (Gemini 忙碌)
        if (error.response && error.response.status === 429) {
            console.log('✅ 捕獲到 429 錯誤，顯示警告');
            await showWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
            return;
        }
        
        // 檢查錯誤訊息中是否包含 API 錯誤標記
        const errorMessage = error.response?.data?.error || error.message || '';
        console.log('錯誤訊息:', errorMessage);
        
        if (errorMessage.includes('API 請求頻率過高') || errorMessage.includes('429')) {
            console.log('從錯誤訊息中檢測到 429，顯示警告');
            showWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
            return;
        }
        
        // 檢查 summary 中是否包含 Gemini 繁忙訊息
        const summaryMessage = error.response?.data?.analysis?.summary || '';
        if (summaryMessage.includes('當前Gemini API 過於繁忙')) {
            console.log('從摘要中檢測到 Gemini 繁忙，顯示警告');
            showWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
            return;
        }
        
        console.log('顯示一般錯誤訊息');
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
