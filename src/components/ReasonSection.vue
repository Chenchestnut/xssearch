<script setup>

</script>

<template>
    <section class="reason">
        <h2 class="title">推薦理由</h2>
        <div class="reasonContent">
            <p>這款手機擁有出色的性能和優雅的設計，無論是拍照還是遊戲都能輕鬆應對。</p>
        </div>
        <hr>
    </section>
</template>


<style lang="scss" scoped>
hr{
    width: 85%;
}
.reason{
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    h2.title{
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        // padding-top:1.5rem ;
    }
    .reasonContent{
        background-color: #7E90A7;
        color: white;
        width: 80%;
        padding: 1.5rem 2rem;
        border-radius: 35px;
        margin: 1.5rem auto;
        p{
            font-size: 1rem;
            text-align: left;
        }
    }
}
</style>
