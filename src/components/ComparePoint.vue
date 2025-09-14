<script setup>

</script>

<template>
    <div class="compareConclusion">
        <section class="win">
            <h2 class="title">他贏在哪</h2>
            <div class="winnerContent">
                <ul>
                    <li>性能優越，處理速度快</li>
                    <li>相機表現出色，拍照效果佳</li>
                    <li>電池續航能力強，使用時間長</li>
                </ul>
            </div>
        </section>
        <section class="lose">
            <h2 class="title">雖然輸了仍有亮點</h2>
            <div class="content">
                <ul>
                    <li>設計時尚，外觀吸引人</li>
                    <li>價格相對較低，性價比高</li>
                    <li>重量比較輕，攜帶方便</li>
                </ul>
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped>
.compareConclusion{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    flex: 0 1 auto;
    gap: 2rem;
    section{
        display: flex;
        flex-direction: column;
        justify-content: start;
        h2.title{
                font-size: 2rem;
                font-weight: bold;
                text-align: left;
                // padding-top:1.5rem ;
        }
        div.winnerContent{
            background-color: #7E90A7;
            background: hsla(25, 28%, 88%, 1);
            // background: linear-gradient(135deg, hsla(25, 28%, 88%, 1) 0%, hsla(14, 34%, 75%, 1) 100%);
            // background: -moz-linear-gradient(135deg, hsla(25, 28%, 88%, 1) 0%, hsla(14, 34%, 75%, 1) 100%);
            // background: -webkit-linear-gradient(135deg, hsla(25, 28%, 88%, 1) 0%, hsla(14, 34%, 75%, 1) 100%);
            // filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#E9DFD8", endColorstr="#D4B2A8", GradientType=1 );
            width: 80%;
            padding: 1.5rem 2rem;
            border-radius: 35px;
            margin: 1.5rem auto;
            p{
                font-size: 1rem;
                text-align: left;
            }
        }
        div.content{
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
        ul{
            padding: 0 1.5rem;
            li{
                font-size: 1.15rem;
                margin: 0.5rem 0;
            }
        }
    }
}
    
</style>
