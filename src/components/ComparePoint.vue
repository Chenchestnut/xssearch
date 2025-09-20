<script setup>

</script>

<template>
    <div class="comparePoint">
        <section class="win">
            <h2 class="title">iphone 15</h2>
            <div class="winnerContent">
                <h2 class="good">優點<i class="fa-solid fa-thumbs-up"></i></h2>
                <ul>
                    <li>性能優越，處理速度快</li>
                    <li>相機表現出色，拍照效果佳</li>
                    <li>電池續航能力強，使用時間長</li>
                </ul>
            </div>
        </section>
        <section class="lose">
            <div class="loserContent">
                <h2 class="bad">缺點<i class="fa-solid fa-thumbs-down"></i></h2>
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
hr{
    width: 85%;
}
.comparePoint{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 1rem 0;
    section{
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 15%;
        min-width: 350px;
        margin-top: 1.5rem;
        h2.title{
            font-size: 2rem;
            font-weight: bold;
            text-align: left;
            // padding-top:1.5rem ;
        }
        div.winnerContent{
            background-color: #dddcd3;
            box-shadow: 5px 5px 5px rgba(181, 184, 163, 0.8);
            padding: 1.5rem 2rem;
            // border-block-start: #d4b2a8 solid 1px;
            border-radius: 35px;
            margin: 1.5rem 0;
            h2.good{
                font-size: 1.5rem;
                font-weight: 400;
                i{
                    color: #d88f8a;
                    margin-left: 1rem;
                }
            }
            p{
                font-size: 1rem;
                text-align: left;
            }
        }
        div.loserContent{
            background-color: #caccd3;
            box-shadow: 5px 5px 5px rgba(126, 144, 167, 0.8);
            width: 15%;
            min-width: 350px;
            color: #2F2F2F;
            padding: 1.5rem 2rem;
            border-radius: 35px;
            margin: 1.5rem 0;
            h2.bad{
                font-size: 1.5rem;
                font-weight: 400;
                i{
                    color: #8a9bd8;
                    margin-left: 1rem;
                }
            }
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

@media screen and (max-width: 520px) {
    .comparePoint{
            justify-content: center;
            align-items: center;
            gap: 0;
            section.win,section.lose{
                min-width: 290px;
                h2{
                    font-size: 1.8rem;
                }
                ul{
                    li{
                        font-size: 1rem;
                    }
                }
        }
    }
}
</style>
