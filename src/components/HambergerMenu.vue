<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useInputStore } from '../stores/useInputStore';
const router = useRouter();

const isHambergerMenuOpen = ref(true);
const inputStore = useInputStore();
const token = computed(() => inputStore.token);
const avatar = computed(() => inputStore.picture);

// function closeMenu() {
//     isHambergerMenuOpen.value = !isHambergerMenuOpen.value;
// }

let menu = ['首頁', '普通搜尋','個人化推薦', '好物比拚', '升級方案', '登出']
function changePage(item){
    switch(item){
        case '首頁':
            router.push('/');
            break;
        case '普通搜尋':
            router.push('/search');
            break;
        case '個人化推薦':
            router.push('/recommend');
            break;
        case '好物比拚':
            router.push('/compare');
            break;
        case '升級方案':
            router.push('/membership');
            break;
        case '登出':
            // 登出邏輯
            router.push('/');
            break;
    }
}
</script>

<template>
<div class="hambergerMenu">
    <!-- <div class="close" @click="closeMenu">
        <i class="fa-solid fa-xmark"></i>
    </div> -->
    <div class="component">
        <div class="avatar">
            <img :src="avatar" alt="google avatar" v-if="token">
            <i class="fa-regular fa-user" v-else></i>
        </div>
        <ul>
            <li v-for="item in menu" :key="item" @click="changePage(item)">{{ item }}</li>
        </ul>
    </div>
</div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
div.hambergerMenu{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 95px;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #efece9;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    // border-bottom-left-radius: 35px;
    // border-bottom-right-radius: 35px;
    .close{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        cursor: pointer;
        i{
            font-size: 1.5rem;
        }
    }
    .component{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        color: $word-color;
        .avatar{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 0.5rem;
            background-color: #B5B8A3;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            i{
                color: white;
                cursor: pointer;
            }
        }
        ul{
            list-style-type: none;
            padding: 0;
            li{
                margin-bottom: 1rem;
                font-size: 1rem;
                cursor: pointer;
                &:hover{
                    color: #B5B8A3;
                }
            }
        }
    }
}
</style>
