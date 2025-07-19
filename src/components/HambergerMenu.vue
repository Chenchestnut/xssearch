<script setup>
import { ref } from 'vue';
const isHambergerMenuOpen = ref(true);
// function closeMenu() {
//     isHambergerMenuOpen.value = !isHambergerMenuOpen.value;
// }

let menu = ['首頁', '普通搜尋', '個人化推薦', '好物比拚', '升級方案', '登出']
</script>

<template>
<div class="hambergerMenu">
    <!-- <div class="close" @click="closeMenu">
        <i class="fa-solid fa-xmark"></i>
    </div> -->
    <div class="component">
        <ul>
            <li v-for="item in menu" :key="item">{{ item }}</li>
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
        background-color: #fff;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        color: $word-color;
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
