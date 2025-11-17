<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './Navbar.vue';
import { useAlert } from '../SweetAlert';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAnimations } from '../composables/useAnimations';
import { useRecommendStore } from '../stores/useRecommendStore';
import { useInputStore } from '../stores/useInputStore';
import { useTurnstile } from '../composables/useTurnstile';
const recommendStore = useRecommendStore();
const inputStore = useInputStore();
const searchQuery = ref('');
const router = useRouter();
const { showLoading, closeLoading, showWarning, updateLoading } = useAlert();
const {  searchBoxAnimation } = useAnimations();
const { renderTurnstile, initTurnstile, hasValidToken, getCurrentToken } = useTurnstile();
const turnstileWidgetId = ref(null);
const canSubmit = ref(false);

onMounted(async ()=>{
    searchBoxAnimation('.searchBar')
    
    if (!inputStore.token) {
        console.log('❌ 使用者未登入，跳轉到登入頁');
        showWarning(
            '請先登入',
            '您需要登入才能使用搜尋功能'
        );
        setTimeout(() => {
            router.push('/login');
        }, 2000);
    } else {
        console.log('✅ 使用者已登入:', inputStore.userInfo.name);
        
        // 初始化 Turnstile
        await initTurnstile();
        
        // 渲染 Turnstile 小工具
        turnstileWidgetId.value = await renderTurnstile(
            'turnstile-widget-recommend',
            (token) => {
                canSubmit.value = true;
                console.log('✅ Turnstile 驗證成功');
            },
            (error) => {
                canSubmit.value = false;
                console.error('❌ Turnstile 驗證失敗:', error);
            }
        );
    }
})


async function handleSearch(){
    if(searchQuery.value.trim()===''){
        showWarning('請輸入商品需求');
        return;
    }
    
    if (!canSubmit.value) {
        showWarning('請先完成安全驗證', '需要通過 Turnstile 驗證才能搜尋');
        return;
    }
    
    showLoading('努力搜尋中...')
    let currentProgress = 5;
    let progressInterval = null;
    
    const startSimulatedProgress = () => {
        progressInterval = setInterval(() => {
            if (currentProgress < 95) {
                // 使用緩動函數，越接近 95% 增長越慢
                const increment = (95 - currentProgress) * 0.01;
                currentProgress += Math.max(increment, 0.5);
                updateLoading(Math.floor(currentProgress));
            }
        }, 200);
    };
    try{
        updateLoading(5);
        
        // 取得 Turnstile token
        const turnstileToken = getCurrentToken();
        
        updateLoading(10);
        startSimulatedProgress();
        
        // 準備請求資料
        const requestData = {
            "query": searchQuery.value,
            "turnstile_token": turnstileToken
        };
        
        console.log('✅ 已包含 Turnstile token 在推薦請求中');
        
        const response = await axios.post(
            'https://api-xssearch.brid.pw/api/recommend/',
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${inputStore.token}`  // 使用系統 JWT
                },
                onDownloadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        if (progressInterval) {
                            clearInterval(progressInterval);
                            progressInterval = null;
                        }
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
        console.log('=== 後端完整回應 ===');
        console.log('data:', data);
        console.log('data.success:', data.success);
        console.log('data.data:', data.data);
        console.log('data.data.recommendation:', data.data.recommendation);
        //驗證後端回應
        if (!data) {
            throw new Error('後端回應失敗');
        }
        const recommendData = data.data.recommendation;
        console.log('recommend資料:', recommendData);
        console.log('✅ 推薦資料:', recommendData);
        
        // ✅ 檢查是否有資料
        if (!Array.isArray(recommendData) || recommendData.length === 0) {
            throw new Error('沒有找到相關商品');
        }
        console.log(data);
        updateLoading(98);
        recommendStore.saveRecommendResults(recommendData);
        await new Promise(resolve => setTimeout(resolve, 150));

        // 稍微延遲，讓進度條到達 100%
        updateLoading(100);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        closeLoading()
        router.push('/recommendPageCache')
    }catch(error){
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
        console.error('完整錯誤物件:', error);
        closeLoading();
        
        // 檢查是否為 HTTP 錯誤回應
        if (error.response) {
            const errorData = error.response.data;
            const status = error.response.status;
            console.log('HTTP 錯誤回應:', errorData);
            
            // 檢查是否為 429 錯誤 (Gemini 忙碌)
            if (error.response.status === 429) {
                showWarning("抱歉，目前Gemini 忙碌中", "請稍後再試");
                return;
            }
            
            // 檢查是否為權限不足錯誤
            if (error.response.status === 403) {
                showWarning("QQ 這是付費限定功能，您沒有開通，因此不能使用。");
                setTimeout(() => {
                    router.push('/membership');
                }, 1500);
                return; // 避免執行後續的一般錯誤處理
            }
            
            // 檢查是否為認證錯誤
            if (error.response.status === 401) {
                showWarning("登入已過期", "請重新登入後再試");
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
                return;
            }
        }
        
        // 其他錯誤顯示一般錯誤訊息
        showWarning("QQ 沒找到相關資訊!", "請檢查您的輸入是否有拼寫錯誤，或嘗試使用不同的關鍵詞進行搜索。");
    }
}

</script>

<template>
    <div class="recommendSearchPage">
        <Navbar />
        <p>我想找一個...</p>
        <form @submit.prevent="handleSearch">
            <div class="searchBar">
                <input v-model="searchQuery" type="text" placeholder="可以打電動的筆電 或 適合拍照的手機" class="searchInput">
                <button 
                    type="submit"
                    :class="{ 'disabled': !canSubmit }"
                    :disabled="!canSubmit"
                >
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            
            <!-- Turnstile 驗證小工具 -->
            <div class="turnstile-container">
                <div id="turnstile-widget-recommend"></div>
            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.recommendSearchPage{
    background-image: url('../assets/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100vw;
    background-attachment: fixed;
    top: 0;
    left: 0;
}
p{
    margin-top: 8rem;
    margin-bottom: 2.5rem;
    font-size: 2.5rem;
    font-weight: 450;
    text-align: center;
    color: $word-color;
    @media screen and (max-width: 520px) {
        font-size: 1.5rem;
        // margin-top: 4rem;
        
    }
}
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .searchBar{
        position: relative;
        width: 50%;
        min-width: 300px;
        input.searchInput{
        padding: 1.25rem 4rem 1.25rem 1.5rem;
        width: 100%;
        background-color: #EFECE9;
        border: 2px solid #B5B8A3;
        border-radius: 50px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-size: 1.2rem;
        margin-top: 1rem;
        @media screen and (max-width: 520px) {
            padding: 1rem 4rem 1rem 1.25rem;
            font-size: 1rem;
        }
        &:focus{
            outline: none;
        }
        }
        button{
            position: absolute;
            right: 10px;
            top: 60%;
            transform: translateY(-50%);
            background-color: transparent;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            transition: all 0.3s ease;
            
            &:not(.disabled):hover{
                background-color: rgba(154, 167, 184, 0.1);
            }
            
            &.disabled {
                cursor: not-allowed;
                opacity: 0.5;
                
                i {
                    color: #ccc !important;
                }
            }
            
            i{
                color: #7E90A7;
            }
        }
    }
    
    .turnstile-container {
        display: flex;
        justify-content: center;
        margin-top: 1.5rem;
        
        #turnstile-widget-recommend {
            transform: scale(0.9);
            transform-origin: center;
        }
        
        @media screen and (max-width: 520px) {
            margin-top: 1rem;
            
            #turnstile-widget-recommend {
                transform: scale(0.8);
            }
        }
    }
}

</style>
