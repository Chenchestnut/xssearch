<script setup>

</script>

<template>
    <div class="compareConclusion">
        <div class="box">
            <h2 class="title">結論</h2>
            <div class="content">
                <p>經過多方面的分析後，iphone 15有更優異的表現，這款手機在性能、相機和電池續航方面表現出色，是一款值得推薦的產品。</p>
            </div>
        </div>
    </div>
    <hr>
</template>


<style lang="scss" scoped>
hr{
    width: 85%;
}
.compareConclusion{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 1rem 0;
    div.box{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        h2.title{
            font-size: 2rem;
            font-weight: 500;
            text-align: left;
            @media screen and (max-width: 520px) {
                font-size: 1.8rem;
            }
        }
        div.content{
            background-color: #7E90A7;
            color: white;
            width: 100%;
            padding: 1.5rem 2rem;
            border-radius: 35px;
            margin: 1.5rem 0;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
            p{
                font-size: 1rem;
                text-align: left;
            }
        }
    }
}
</style>
