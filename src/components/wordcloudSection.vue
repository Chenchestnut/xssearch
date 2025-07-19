<script setup>

</script>

<template>
    <section>
        <h2 class="title">文字雲</h2>
        <div class="wordcloud">
            <img src="../assets/wordCloud.png" alt="keyword">
        </div>
        <hr>
    </section>
</template>


<style lang="scss" scoped>
hr{
    width: 85%;
}
h2.title{
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    padding-top:1.5rem ;
}
 div.wordcloud{
    width: 100%;
    display: flex;
    justify-content: center;
    img{
        width: 75%;
        min-width: 360px;
        height: auto;
        object-fit: cover; /* 把圖片撐滿容器且不變形 */
        display: block;    /* 消除底部多餘空隙 */
        border-radius: 20px;
    }
}
</style>