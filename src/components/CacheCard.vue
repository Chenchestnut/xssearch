<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const changeToResult = () => {
  router.push('/searchResult');
};
</script>

<template>

  <div class="cacheCard" @click="changeToResult">
    <div class="imgBox">
        <img src="../assets/iphone.jpg" alt="商品圖片">
    </div>
    <div class="content">
        <p class="title">iPhone16</p>
        <p>螢幕：6.1吋</p>
        <p>重量：170克</p>
        <p>晶片：A18晶片</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
$word-color:#2F2F2F;
.cacheCard{
    display: flex;
    flex-direction: row;
    width: 30%;
    // max-width: 700px;
    min-width: 350px;
    min-height: 300px;
    margin: 2.5rem 2.5rem;
    background-color: #B5B8A3;
    border-radius: 25px;
    justify-content: flex-start;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover{
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
    }
    @media screen and (max-width: 520px) {
        min-width: 300px;
        min-height: 250px;
        margin: 2.5rem 0.5rem;
    }
    .imgBox{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40%;
        min-height: 35%;
        max-height: 80%;
        border-radius: 25px;
        overflow: hidden;
        margin: 2rem 0 0 2rem;
        img{
        width: 100%;
        height: auto;
        }
    }
    .content{
        display: flex;
        flex-direction: column;
        // width: 80%;
        justify-content: flex-start;
        text-align: left;
        color: $word-color;
        padding: 2.5rem 0;
        margin: 0 2rem;
        @media screen and (max-width: 520px) {
            padding: 2rem 0;
            margin:  0 1rem 0 1.5rem;
        }
        p.title{
            font-size: 1.5rem;
            font-weight: 600;
            padding: 0 0 2rem 0;
            @media screen and (max-width: 520px) {
                font-size: 1.2rem;
                
            }
        }
        p{
            font-size: 1rem;
            margin: 0.25rem 0;
            @media screen and (max-width: 520px) {
                font-size: 0.8rem;
            }
        }
    }
}
</style>
