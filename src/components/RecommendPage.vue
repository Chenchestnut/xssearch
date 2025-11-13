<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './Navbar.vue';
import { useAlert } from '../SweetAlert';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAnimations } from '../composables/useAnimations';
import { useRecommendStore } from '../stores/useRecommendStore';
const recommendStore = useRecommendStore();
const searchQuery = ref('');
const router = useRouter();
const { showLoading, closeLoading, showWarning, updateLoading } = useAlert();
const {  searchBoxAnimation } = useAnimations();

onMounted(()=>{
    searchBoxAnimation('.searchBar')
})
async function handleSearch(){
    if(searchQuery.value.trim()===''){
        showWarning('請輸入商品需求');
        return;
    }
    showLoading('努力搜尋中...')
    let currentProgress = 5;
    let progressInterval = null;
    
    const startSimulatedProgress = () => {
        progressInterval = setInterval(() => {
            if (currentProgress < 95) {
                // 使用緩動函數，越接近 95% 增長越慢
                const increment = (95 - currentProgress) * 0.1;
                currentProgress += Math.max(increment, 0.5);
                updateLoading(Math.floor(currentProgress));
            }
        }, 200);
    };
    try{
        updateLoading(5);
        startSimulatedProgress();
        const response = await axios.post(
            'https://api-xssearch.brid.pw/api/recommend/',
            {"query":searchQuery.value},
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
        console.log(data);

        updateLoading(98);
        recommendStore.saveRecommendResults(data);
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
        console.error(error);
        closeLoading()
        showWarning("QQ 沒找到相關資訊!", "請檢查您的輸入是否有拼寫錯誤，或嘗試使用不同的關鍵詞進行搜索。")
    }
}

</script>

<template>
    <div class="recommendSearchPage">
        <Navbar />
        <p>我想找一個...</p>
        <form @submit.prevent="handleSearch">
            <div class="searchBar">
                <input v-model="searchQuery" type="text" placeholder="可以打電動的筆電" class="searchInput">
                <button type="submit">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
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
            &:hover{
                background-color: rgba(154, 167, 184, 0.1);
            }
            i{
                color: #7E90A7;
            }
        }
    }
}

</style>
