<script setup>
import { ref } from 'vue';
let isCollapsed = ref(true);
function toggleCollapsed(){
    isCollapsed.value = !isCollapsed.value;
    console.log(isCollapsed);
}
</script>

<template>
<div class="specification">
    <div class="description" :class="{ collapsed: isCollapsed }">
        <ul>
            <li>商品：iPhone 16</li>
            <li>品牌：Apple</li>
            <li>型號：iPhone 16（6.1 吋）</li>
            <li>螢幕：6.1吋</li>
            <li>晶片：A18晶片</li>
        </ul>
        <div v-if="isCollapsed" class="mask"></div>
    </div>
        
    <button @click="toggleCollapsed">
        <span v-if="isCollapsed"><i class="fa-solid fa-arrow-down fa-xs"></i>查看更多</span>
        <span v-else><i class="fa-solid fa-arrow-up"></i>收回</span>
    </button>
</div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.specification{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px; /* 給容器一個高度 */
    .description{
        position: relative;
        max-height: none;
        overflow: hidden;
        transition: max-height 0.3s ease;
        ul{
            list-style: none;
            li{
                font-size: 1.2rem;
                color: $word-color;
                margin: 0.5rem 0;
            }
        }
        div.mask{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 2rem;
            background: linear-gradient(rgba(255, 255, 255, 0), #EFECE9);
        }
    }
    .description.collapsed{
        max-height: 8rem;
    }
    button{
        background-color: transparent;
        font-size: 1rem;
        color: $word-color;
        border: none;
        cursor: pointer;
        margin: 1rem 0;
        color: #9aa7b8;
        &:hover{
            color: #7e90a7;
        }
        i{
            margin: 0 0.5rem;
        }
    }
    
}
</style>
