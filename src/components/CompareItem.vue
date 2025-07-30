<script setup>
import { reactive, ref } from 'vue';

let selectSort = ref('筆電');
let selectDetail = ref([]);
// let sortArray = reactive(['筆電', '平板', '手機']);
let compareDetails = reactive({
    '筆電': ['性能', '散熱', '外觀設計', '螢幕', '鍵盤/觸控板', '電池續航力', '軟體/系統', '價格'],
    '平板': ['顯示效果', '觸控體驗', '續航與充電', '尺寸與重量', '音效與喇叭', '應用與生態', '價格'],
    '手機': ['相機', '螢幕', '電池與充電', '效能', '系統體驗', '設計與材質', '音訊','價格']
});
</script>

<template>
    <div class="compareItem">
        <div class="compareSort">
            <p>商品種類</p>
            <div class="sortBtn">
                <button v-for="(detail, sort) in compareDetails" :key="sort"  :class="{active: selectSort === sort}" @click="selectSort = sort">{{ sort }}</button>
            </div>
        </div>
        <div class="compareDetails">
            <p>對比項目</p>
            <br>
            <form>
                <div class="compareDetail" v-for="(detail, index) in compareDetails[selectSort]" :key="index">
                    <i class="fa-solid fa-tag"></i>
                    <input v-model="selectDetail" type="checkbox" :id="'detail' + index" :value="detail">
                    <label :for="'detail' + index" :class="{active: selectDetail.includes(detail)}">{{ detail }}</label>
                </div>
            </form>
        </div>
        
    </div>

</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.compareItem{
    display: flex;
    flex-direction: column;
    color: $word-color;
    background-color: #D3D2C7;
    width: 50%;
    border-radius: 35px;
    margin-top: 3rem;
    min-width: 300px;
    .compareSort{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: flex-start;
        width: 100%;
        padding: 1.5rem 1.5rem 0.5rem 1.5rem;
        div.sortBtn{
            margin-top: 1rem;
            button{
                background-color: #a4aebd;
                padding: 0.5rem 2rem;
                border: none;
                border-radius: 35px;
                margin: 0 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                @media screen and (max-width: 960px) {
                    padding: 0.5rem 1rem;
                    margin: 0 0.5rem;
                    min-width: 60px;
                }
                &:hover{
                    background-color: #7e90a7;
                    color: white;
                }
                &.active{
                    background-color: #7e90a7;
                    color: white;   
                }
            }
        }    
    }
    .compareDetails{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        padding: 1.5rem;
        form{
            display: flex;
            flex-wrap: wrap;
            flex: 0 1 auto;
            div.compareDetail{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                margin: 0.5rem;
                i{
                    // color: #D3D2C7;
                    margin-right: 0.3rem;
                }
                input{
                    cursor: pointer;
                    display: none;
                }
                label{
                    cursor: pointer;
                    border: black solid 1px;
                    border-radius: 10px;
                    padding: 0.5rem 2rem;
                    @media screen and (max-width: 960px) {
                        padding: 0.5rem 1.5rem;
                    }
                    &:hover{
                        background-color: #B5B8A3;
                    }
                    &.active{
                        background-color: #B5B8A3;
                    }
                }
            }
        }
    }
}
</style>
