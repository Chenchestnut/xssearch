<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInputStore } from '../stores/useInputStore';
import { defineProps } from 'vue';
import { onMounted } from 'vue';
const router = useRouter();

// const isHambergerMenuOpen = ref(false);
const inputStore = useInputStore();
const token = computed(() => inputStore.token);
const avatar = computed(() => inputStore.picture);

const props = defineProps({
    isOpen: Boolean
})
console.log('組件初始化，props.isOpen:', props.isOpen);
// function closeMenu() {
//     isHambergerMenuOpen.value = !isHambergerMenuOpen.value;
// }
//打開設定禁止滾動頁面
watch( () => props.isOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
        console.log(newVal,"禁止滾動")
    }
    else{
        document.body.style.overflow = '';
    }
});

onMounted(()=>{
    document.body.style.overflow = '';
})
onUnmounted(() => {
    document.body.style.overflow = '';
});

let menu = computed(()=>{
    if(token.value){
        return ['首頁', '普通搜尋','個人化推薦', '好物比拚', '升級方案', '登出']
    }
    else{
        return ['首頁', '普通搜尋','個人化推薦', '好物比拚', '升級方案', '登入']
    }
})
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
            if(token.value){
                router.push('/compare');
            }
            else{
                router.push('/login');
            }
            break;
        case '升級方案':
            router.push('/membership');
            break;
        case '登出':
            inputStore.removeToken();
            router.push('/');
            break;
        case '登入':
            router.push('/login');
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
