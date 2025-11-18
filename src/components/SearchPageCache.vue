<script setup>
import Navbar from './Navbar.vue';
import CacheCard from './CacheCard.vue';
import { useSearchStore } from '../stores/useSearchStore';
import { useIndexStore } from '../stores/useIndexStore';
import { useAnalysisStore } from '../stores/useAnalysisStore';
import { useAlert } from '../SweetAlert';
import { useRouter } from 'vue-router';
const router = useRouter();
const { showLoading, closeLoading, updateLoading, showWarning } = useAlert();
import axios from 'axios';
const searchStore = useSearchStore();
const indexStore = useIndexStore();
const analysisStore = useAnalysisStore();
import { useInputStore } from '../stores/useInputStore';

const inputStore = useInputStore();

// 備用警告方法，以防 SweetAlert 出現問題
const safeShowWarning = (title, text) => {
  try {
    return showWarning(title, text);
  } catch (error) {
    console.error('SweetAlert 錯誤:', error);
    // 使用原生 alert 作為備用
    alert(`${title}\n${text}`);
    return Promise.resolve();
  }
};

function getIdIndex(index){
  indexStore.setIndex(index);
}

async function handleAnalysis(index){
  getIdIndex(index);
  console.log(searchStore.search_keyword, searchStore.matched_products[index].id);
  showLoading('努力分析中...')
  //接分析
  try{
        updateLoading(5);
        const response = await axios.post(
            'https://api-xssearch.brid.pw/api/analysis/',
            {"keyword":searchStore.search_keyword,
            "product_id": searchStore.matched_products[index].id},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${inputStore.token}`
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
        console.log('分析回應資料:', data);
        
        // 檢查回應中是否包含 Gemini 繁忙訊息
        if (data.analysis?.summary?.includes('當前Gemini API 過於繁忙')) {
            console.log('從回應數據中檢測到 Gemini 繁忙，顯示警告');
            closeLoading();
            await safeShowWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
            return;
        }
        
        updateLoading(85);  // 資料處理中
        analysisStore.saveAnalysisResults(data);
        updateLoading(95);
        // 稍微延遲，讓進度條到達 100%
        await new Promise(resolve => setTimeout(resolve, 200));
        updateLoading(100);
        
        // 再延遲一下讓使用者看到 100%
        await new Promise(resolve => setTimeout(resolve, 300));
        closeLoading()
        router.push('/searchResult')
    }catch(error){
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
            await safeShowWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
            return;
        }
        
        // 檢查錯誤訊息中是否包含 API 錯誤標記
        const errorMessage = error.response?.data?.error || error.message || '';
        console.log('錯誤訊息:', errorMessage);
        
        if (errorMessage.includes('API 請求頻率過高') || errorMessage.includes('429')) {
            console.log('從錯誤訊息中檢測到 429，顯示警告');
            await safeShowWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
            return;
        }
        
        // 檢查 summary 中是否包含 Gemini 繁忙訊息
        const summaryMessage = error.response?.data?.analysis?.summary || '';
        if (summaryMessage.includes('當前Gemini API 過於繁忙')) {
            console.log('從摘要中檢測到 Gemini 繁忙，顯示警告');
            await safeShowWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
            return;
        }
        
        console.log('顯示一般錯誤訊息');
        await safeShowWarning("資訊載入錯誤，請重新嘗試", '');
    }
}
</script>

<template>
  <div class="searchPageCache">
    <Navbar />
    <div class="productCache">
        <CacheCard v-for="(item,index) in searchStore.matched_products_count" :key="index"  :img="searchStore.matched_products[index].img" :name="searchStore.matched_products[index].name" :spe="searchStore.matched_products[index].spec" @click="handleAnalysis(index)"/>
    </div>
    
  </div>
</template>


<style lang="scss" scoped>
.searchPageCache {
  background-image: url('../assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100vw;
  // background-attachment: fixed;
  // top: 0;
  // left: 0;
  position: relative;
  // padding: 2rem;
  .productCache{
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  justify-content: center;
  flex: auto;
  }
}


</style>
