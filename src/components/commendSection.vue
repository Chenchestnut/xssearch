<script setup>
// alert('commendSection 組件開始載入');
import Comment from './Comment.vue';
import { useSearchStore } from '../stores/useSearchStore';
import { useAnalysisStore } from '../stores/useAnalysisStore';
import { computed, ref, onMounted } from 'vue';

// console.log('commendSection 組件載入了');
const searchStore = useSearchStore();
const analysisStore = useAnalysisStore();
// console.log('searchStore.analysis:', searchStore.analysis);
// console.log('searchStore.analysis.summary:', searchStore.analysis.summary);
const platform = ref('mobile01')
// function handlePlatformChange(platformName) {
//     platform.value = platformName;
// }
const mobile01Reviews = analysisStore.mobile01Reviews;
const max = mobile01Reviews.length;
console.log('mobile01Reviews:', mobile01Reviews);
console.log('評論總數:', max);
const count = 3;
function randomNumber(count,max){
    const number = []
    while(number.length < count){
        const randomIndex = Math.floor(Math.random() * max);
        if(!number.includes(randomIndex)){
            number.push(randomIndex);
        }
    }
    return number;
}
const comments = ref([]);
function changeComment(){
    const selectComments = [];
    const randomComments = randomNumber(count,max);
    console.log('randomComments:', randomComments);
    randomComments.forEach((index) => {
        selectComments.push(mobile01Reviews[index].comment);
    });
    comments.value = selectComments;
}

onMounted(() => {
    if (max > 0) {
        changeComment();
    } 
});
</script>

<template>
    <section>
        <div class="comment">
            <h2>評論</h2>
            <div class="totalComment">
                <p>{{ analysisStore.analysis.summary}}</p>
            </div>
            <div class="commentContent">
                <div class="button">
                    <ul>
                        <li><span :class="{active:platform === 'mobile01'}">mobile01</span></li>
                        <!-- <li @click="handlePlatformChange('techbang')"><span :class="{active:platform === 'techbang'}">techbang</span></li>
                        <li class="noBorder" @click="handlePlatformChange('eprice')"><span :class="{active:platform === 'eprice'}">eprice</span></li> -->
                        <!-- <li><span>Momo</span></li>
                        <li><span>PChome</span></li>
                        <li><span>T客邦</span></li>
                        <li class="noBorder"><span>eprice</span></li> -->
                    </ul>
                    <div class="changebtn">
                        <span @click="changeComment">其他評論</span>
                    </div>
                </div>
                <div class="commentList">
                    <Comment :platform="platform" :comments="comments"/>
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
    @media screen and (max-width: 520px) {
        font-size: 1.8rem;
    }
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
        min-width: 290px;
        padding: 1.5rem 2rem;
        background-color: #7E90A7;
        color: white;
        border-radius: 35px;
        margin-bottom: 1rem;
        p{
            font-size: 1.15rem;
            text-align: left;
            @media screen and (max-width: 650px) {
                font-size: 1rem;
                
            }
        }
    }
    .commentContent{
        width: 80%;
        margin-top: 1.5rem;
        div.button{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            ul{
                display: flex;
                justify-content: center;
                list-style: none;
                padding: 0;
                li{
                    font-size: 1.5rem;
                    font-weight: 300;
                    // cursor: pointer;
                    padding: 1rem 3rem;
                    // border-bottom: black 1px solid;
                    // border-right: #2F2F2F 1px solid;
                    @media screen and (max-width: 950px) {
                        padding: 1rem 1.5rem;
                    }
                    @media screen and (max-width: 650px) {
                        font-size: 1.2rem;
                        padding: 0.75rem 1rem;
                    }
                    @media screen and (max-width: 520px) {
                        font-size: 1rem;
                        padding: 0.5rem 0.2rem;
                        border: none;
                    }
                    span{
                        width: 100%;
                        padding: 0.8rem 1.5rem;
                        border-bottom: black 0.5px solid;
                        @media screen and (max-width: 520px) {
                            border-bottom: black 0.5px solid;
                            border-radius: 35px;
                        }
                        // &:hover{
                        // background-color: #D3D2C7;
                        // border-radius: 35px;
                        // }
                    }
                }
            }
            div.changebtn{
                span{
                    padding: 0.5rem;
                    font-size: 0.8rem;
                    border-radius: 35px;
                    border-bottom: black 0.5px solid;
                    background-color: #D3D2C7;
                    color: #2F2F2F;
                    box-shadow: 0 0 0 0 #2F2F2F;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    &:hover{
                        background-color: #B5B8A3;
                    }
                }
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
// .active{
//     background-color: #D3D2C7;
//     border-radius: 35px;
// }
</style>