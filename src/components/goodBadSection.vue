<script setup>
import { useAnalysisStore } from '../stores/useAnalysisStore';
const analysisStore = useAnalysisStore();
</script>

<template>
    <section>
        <h2 class="title">優缺點</h2>
        <div class="keyPointBox">
            <div class="advantage">
                <h2>優點<i class="fa-solid fa-thumbs-up"></i></h2>
                <ul>
                    <li v-for="(item,index) in analysisStore.analysis.advantage" :key="index">{{ item }}</li>
                </ul>
            </div>
            <div class="disadvantage">
                <h2>缺點<i class="fa-solid fa-thumbs-down"></i></h2>
                <ul>
                    <li v-for="(item,index) in analysisStore.analysis.disadvantage" :key="index">{{ item }}</li>
                </ul>
            </div>
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
    @media screen and (max-width: 520px) {
        font-size: 1.8rem;
    }
}
section{
    flex-shrink: 0;
    // margin-left: 15px;
    .keyPointBox{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex: 0 1 auto;
        justify-content: space-between;
        gap: 2rem;
        width: 100%;
        div.advantage, div.disadvantage{
            width: 15%;
            min-width: 350px;
            // text-align: center;
            border-radius: 35px;
            margin: 2rem 0;
            padding: 1.5rem 0 1.5rem 2rem;
            h2{
                display: inline-block;
                max-width: 100%;
                font-size: 1.75rem;
                font-weight: 400;
                i{
                    color: #d88f8a;
                    margin: 1rem;
                }
            }
            ul{
                // list-style: none;
                padding: 0 1.5rem;
                li{
                    font-size: 1.15rem;
                    margin: 0.5rem 0;
                    text-align: left;
                }
            }
        }
        div.disadvantage{
            background-color: #caccd3;
        }
        div.advantage{
            background-color: #dddcd3;
        }
    }
}


@media screen and (max-width: 520px) {
    section{
        .keyPointBox{
            justify-content: center;
            align-items: center;
            gap: 0;
            div{
                width: 15%;
                min-width: 290px;
                h2{
                    font-size: 1.5rem;
                }
                ul{
                    li{
                        font-size: 1rem;
                    }
                }
            }
        }
    }
    
}
</style>