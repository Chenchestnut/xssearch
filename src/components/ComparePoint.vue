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
            <div class="loserContent">
                <ul>
                    <li>設計時尚，外觀吸引人</li>
                    <li>價格相對較低，性價比高</li>
                    <li>重量比較輕，攜帶方便</li>
                </ul>
            </div>
        </section>
    </div>
    <hr>
</template>


<style lang="scss" scoped>
hr{
    width: 85%;
}
.compareConclusion{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    flex: 0 1 auto;
    gap: 2rem;
    width: 100%;
    margin: 1rem 0;
    section.lose{
        
    }
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
            background: linear-gradient(135deg, rgb(239,236,233) 0%, rgb(210,119,114) 100%);
            box-shadow: 1.5px 1.5px 5px rgba(222, 167, 162, 0.5);
            min-width: 250px;
            padding: 1.5rem 2rem;
            border-block-start: #d4b2a8 solid 1px;
            border-block-start-style: dotted;
            border-radius: 35px;
            margin: 1.5rem 0;
            p{
                font-size: 1rem;
                text-align: left;
            }
        }
        div.loserContent{
            background-color: #7E90A7;
            min-width: 250px;
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 35px;
            margin: 1.5rem 0;
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
