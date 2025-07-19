<script setup>
import Comment from './Comment.vue';
</script>

<template>
    <section>
        <div class="comment">
            <h2>評論</h2>
            <div class="totalComment">
                <p>這代最有感的是「終於不會燙手了」！A18玩手遊很順，續航也有進步，但充電還是慢到讓人翻白眼。拍照的AI修圖超強，隨便拍都像網美照，不過螢幕沒120Hz真的說不過去。外觀根本是15換標籤，要不是合約到了真的不想換。建議15用戶可以pass，安卓跳槽的會覺得很新鮮。</p>
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