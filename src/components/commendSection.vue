<script setup>
import Comment from './Comment.vue';
import { useSearchStore } from '../stores/useSearchStore';
console.log('commendSection 組件載入了');
const searchStore = useSearchStore();
console.log('searchStore.analysis:', searchStore.analysis);
console.log('searchStore.analysis.summary:', searchStore.analysis.summary);</script>

<template>
    <section>
        <div class="comment">
            <h2>評論</h2>
            <div class="totalComment">
                <p>{{ searchStore.analysis.summary}}</p>
            </div>
            <div class="commentContent">
                <ul>
                    <li><span>Momo</span></li>
                    <li><span>PChome</span></li>
                    <li><span>T客邦</span></li>
                    <li class="noBorder"><span>eprice</span></li>
                </ul>
                <div class="commentList">
                    <Comment />
                </div>
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
}
div.comment{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2{
        font-size: 2rem;
        font-weight: bold;                  
        padding-top:1.5rem ;
        text-align: center;
        margin-bottom: 1.5rem;
    }
    .totalComment{
        width: 80%;
        padding: 1.5rem 2rem;
        background-color: #7E90A7;
        color: white;
        border-radius: 35px;
        margin-bottom: 1rem;
        p{
            font-size: 1.15rem;
            text-align: left;
        }
    }
    .commentContent{
        width: 80%;
        margin-top: 1.5rem;
        ul{
            display: flex;
            justify-content: center;
            list-style: none;
            li{
                font-size: 1.5rem;
                font-weight: 300;
                cursor: pointer;
                padding: 1rem 3rem;
                border-bottom: black 1px solid;
                border-right: #2F2F2F 1px solid;
                span{
                    padding: 0 1rem;
                    &:hover{
                    background-color: #D3D2C7;
                    border-radius: 35px;
                    }
                }
                
            }
            .noBorder{
                border-right: none;
            }
        }
        .commentList{
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }
    }
}
</style>