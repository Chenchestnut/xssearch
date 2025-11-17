<script setup>
import Navbar from './Navbar.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '../stores/useSearchStore';
import { useAlert } from '../SweetAlert';
import axios from 'axios';
import { useAnimations } from '../composables/useAnimations';
import { useTurnstile } from '../composables/useTurnstile';

const searchQuery = ref('');
const router = useRouter();
const searchStore = useSearchStore();
const { showLoading, closeLoading, showWarning, updateLoading } = useAlert();
const {  searchBoxAnimation} = useAnimations();
const { renderTurnstile, initTurnstile, hasValidToken, getCurrentToken } = useTurnstile();
const turnstileWidgetId = ref(null);
const canSubmit = ref(false);

onMounted(async ()=>{
    searchBoxAnimation('.searchBar')
    // 初始化 Turnstile
    await initTurnstile();
    
    // 渲染 Turnstile 小工具
    turnstileWidgetId.value = await renderTurnstile(
        'turnstile-widget',
        (token) => {
            canSubmit.value = true;
            console.log('✅ Turnstile 驗證成功');
        },
        (error) => {
            canSubmit.value = false;
            console.error('❌ Turnstile 驗證失敗:', error);
        }
    );
})

async function handleSearch(){
    if(searchQuery.value.trim() === '') {
        showWarning('請輸入商品型號或關鍵字', '搜尋欄位不能為空！');
        return;
    }
    
    if (!canSubmit.value) {
        showWarning('請先完成安全驗證', '需要通過 Turnstile 驗證才能搜尋');
        return;
    }
    
    showLoading('努力搜尋中...')
    try{
        updateLoading(5);
        
        // 取得 Turnstile token
        const turnstileToken = getCurrentToken();
        
        updateLoading(15);
        
        // 準備請求資料
        const requestData = {
            "keyword": searchQuery.value,
            "turnstile_token": turnstileToken
        };
        
        console.log('✅ 已包含 Turnstile token 在搜尋請求中');
        
        const response = await axios.post(
            'https://api-xssearch.brid.pw/api/search/',
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                onDownloadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        // 將下載進度映射到 20% - 80%
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 60) / progressEvent.total + 20
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
        searchStore.saveSearchResults(data);
        updateLoading(95);
        // 稍微延遲，讓進度條到達 100%
        await new Promise(resolve => setTimeout(resolve, 200));
        updateLoading(100);
        
        // 再延遲一下讓使用者看到 100%
        await new Promise(resolve => setTimeout(resolve, 300));
        closeLoading()
        router.push('/searchPagecache')
    }catch(error){
        console.error('搜尋錯誤:', error);
        closeLoading();
        
        // 檢查是否為 Turnstile 相關錯誤
        if (error.response && error.response.status === 403) {
            const errorData = error.response.data;
            if (errorData.error && errorData.error.includes('Turnstile')) {
                showWarning(
                    "🤖 安全驗證失敗", 
                    "為了防止機器人攻擊，請稍後再試。如果問題持續發生，請聯絡客服。"
                );
                return;
            }
        }
        
        showWarning("QQ 沒找到相關資訊!", "請檢查您的輸入是否有拼寫錯誤，或嘗試使用不同的關鍵詞進行搜索。")
    }
}


</script>

<template>
    <div class="searchPage">
        <Navbar />
        <p>買前先掃這一頁
        <br>
        踩雷從此是別人的夜</p>
        <form @submit.prevent="handleSearch">
            <div class="searchBar">
                <input v-model="searchQuery" type="text" placeholder="請輸入商品型號或關鍵字" class="searchInput">
                <button type="submit" :disabled="!canSubmit" :class="{ disabled: !canSubmit }">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            
            <div class="turnstile-container">
                <div id="turnstile-widget"></div>
            </div>
        </form>
    </div>
    
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.searchPage{
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
        min-width: 300px; /* 正常狀態下的最小寬度 */
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
            &:hover{
                background-color: rgba(154, 167, 184, 0.1);
            }
            i{
                color: #7E90A7;
            }
            
            &.disabled {
                opacity: 0.5;
                cursor: not-allowed;
                
                &:hover {
                    background-color: transparent;
                }
            }
        }
    }
    
    .turnstile-container {
        display: flex;
        justify-content: center;
        margin-top: 1.5rem;
        
        #turnstile-widget {
            transform: scale(0.9);
            transform-origin: center;
        }
        
        @media screen and (max-width: 520px) {
            margin-top: 1rem;
            
            #turnstile-widget {
                transform: scale(0.8);
            }
        }
    }
}

</style>

