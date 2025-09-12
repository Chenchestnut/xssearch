<script setup>
import Navbar from './Navbar.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CompareItem from './CompareItem.vue';
// import { useAnimations } from '../composables/useAnimations';

// import axios from 'axios';
// const { searchBoxAnimation } = useAnimations();
const searchQuery = ref('');
const router = useRouter();
const showItem = ref(false);

function handleSearch(){
    if(searchQuery.value.trim() === '') {
        alert('請輸入商品型號或關鍵字');
        return;
    }
    router.push('/compareResult')

}

function showCompareItem() {
    showItem.value = !showItem.value;
}

// 串接普通查詢api
// axios.post('https://api.xssearch.brid.pw/api/search/',{"keyword":searchQuery.value})
// .then(function(response){
//     console.log(response.data);
// })
// .catch(function(error){
//     console.error(error);
// })
</script>

<template>
    <div class="comparePage">
        <Navbar />
        <p >又陷入二選一的難題了嗎？</p>
        <div class="container">
                <form @submit.prevent="handleSearch">
                    <div class="searchBar">
                        <div class="item">
                            <div class="number">商品一</div>
                            <input v-model="searchQuery" type="text" placeholder="請輸入商品型號" class="searchInput">
                        </div>
                        <button type="submit">VS</button>
                        <div class="item">
                            <div class="number">商品二</div>
                            <input v-model="searchQuery" type="text" placeholder="請輸入商品型號" class="searchInput">
                        </div>
                        <!-- <button type="submit">
                            <i class="fa-solid fa-magnifying-glass submit"></i>
                        </button> -->
                    </div>
                </form>
                <!-- <i class="fa-solid fa-bars hamburger" @click="showCompareItem"></i> -->
            <!-- <CompareItem v-if="showItem" /> -->
        </div>
        
    </div>
    
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
hr{
    width: 100%;
}

.comparePage{
    background-image: url('../assets/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100vw;
    background-attachment: fixed;
    top: 0;
    left: 0;
    p{
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        font-size: 2.5rem;
        font-weight: 450;
        text-align: center;
        color: $word-color;
        @media screen and (max-width: 900px) {
            font-size: 2rem;
        }
        @media screen and (max-width: 520px) {
            font-size: 1.2rem;
            // margin-top: 4rem;
        }
    }
    div.container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        // div.content{
        //     display: flex;
        //     flex-direction: row;
        //     align-items: center;
        //     justify-content: center;
        //     width: 100%;
        //     margin-top: 1.5rem;
            form{
                display: flex;
                width: 60%;
                // transform: translateX(2%);
                .searchBar{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    // min-width: 300px;
                    padding: 0.5rem 4rem 0.5rem 1.5rem;
                    // background-color: #EFECE9;
                    // border: 2px solid #B5B8A3;
                    border-radius: 150px;
                    font-size: 1.2rem;
                    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    @media screen and (max-width: 630px) {
                        padding: 0.3rem 2.5rem 0.3rem 1rem;
                        font-size: 0.8rem;
                    }
                    div.item{
                        display: flex;
                        align-items: center;
                        justify-content: start;
                        background-color: #EFECE9;
                        border: 2px solid #B5B8A3;
                        div.number{
                            font-size: 1.2rem;
                            padding: 0.5rem 0.3rem 0.5rem 2rem;
                            width: 20%;
                            @media screen and (max-width: 800px) {
                                font-size: 1rem;
                                padding: 0.5rem 0.3rem 0.3rem 1rem;
                                
                            }
                            @media screen and (max-width: 630px) {
                                font-size: 0.7rem;
                                padding: 0.3rem 0.3rem 0.2rem 0.8rem;
                                
                            }
                            @media screen and (max-width: 420px) {
                                display: none;
                                
                            }
                        }
                        input.searchInput{
                            padding: 1.25rem 4rem 1.25rem 1.5rem;
                            width: 100%;
                            background-color: #EFECE9;
                            // border: 2px solid #B5B8A3;
                            border: none;
                            border-radius: 30px;
                            font-size: 1.2rem;
                            // margin-top: 0.5rem;
                            @media screen and (max-width: 800px) {
                                padding: 1rem 4rem 1rem 1.25rem;
                                font-size: 1rem;
                                
                            }
                            @media screen and (max-width: 630px) {
                                padding: 0.8rem 1.5rem 0.8rem 1.25rem;
                                font-size: 0.8rem;
                            }
                            @media screen and (max-width: 420px) {
                                padding: 0.5rem 1rem 0.5rem 0;
                                margin-left: 1rem;

                            }
                        }
                    }
                    button{
                        // position: absolute;
                        // right: 10px;
                        // top: 60%;
                        // transform: translateY(-90%);
                        background-color: #d9bcb3;
                        border: #FFFFFF;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1.5rem;
                        transition: all 0.3s ease;
                        box-shadow:    
                        8px 8px 8px rgba(0, 0, 0, 0.1),
                        -8px -8px 8px rgba(255, 255, 255, 0.7),
                        inset -8px -8px 8px rgba(255, 255, 255, 0.7);
                        &:hover{
                        box-shadow: inset 8px 8px 8px rgba(0, 0, 0, 0.1),
                                    inset -8px -8px 8px rgba(255, 255, 255, 0.7);
                        background-color: #d4b2a8;
                        }
                    }
                }
            }
            i.hamburger{
                color: #7E90A7;
                font-size: 1.5rem;
                padding: 0.5rem;
                cursor: pointer;
                transform: translateX(80%);
                &:hover{
                    background-color: rgba(154, 167, 184, 0.3);
                    border-radius: 50%;
                }
            }
        // }
    }
    
    
}
i.submit{
    @media screen and (max-width: 630px) {
        font-size: 1.2rem;
        
    }
}

</style>

