<script setup>
import { ref, onMounted, onBeforeUnmount} from 'vue';

const props = defineProps({
    items:Array,
    sectionRefs:Array,

})

const activeIndex = ref(-1);
const isScrolling = ref(false)
function sectionToIndex(index){
    const target = props.sectionRefs[index]
    isScrolling.value = true
    activeIndex.value = index
    window.scrollTo({
        top: target.offsetTop - 150, // Adjust for fixed navbar height
        behavior: 'smooth'
    })
    setTimeout(()=>{
        isScrolling.value = false;
    },1000)
    console.log(target.offsetTop)
}

function scroll(){
    if(isScrolling.value)return;
    let currentActive = -1;
    const scrollPosition = window.scrollY
    const scrollBottom = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    props.sectionRefs.forEach((element,index) => {
        if(scrollPosition + 200 > element.offsetTop){
            currentActive = index
        }
    });
    if (scrollBottom >= documentHeight - 50) {
        currentActive = props.sectionRefs.length - 1;
    }
    activeIndex.value = currentActive;

}

onMounted(()=>{
    window.addEventListener('scroll',scroll)
})
onBeforeUnmount(()=>{
    window.removeEventListener('scroll',scroll)
})

</script>

<template>
<div class="sidNavBar">
    <ul>
        <li v-for="(item,index) in items" :key="index" :class="{ active: activeIndex === index }" @click="sectionToIndex(index)">{{ item.title }}</li>
    </ul>
</div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.sidNavBar{
    position: fixed;
    z-index: 999; // 確保側邊導航欄在最上層
    top: 100px;
    left: 0;
    min-width: 90px;
    width: auto;
    background-color: rgba(210, 213, 218, 0.8);
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    color: $word-color;
    margin-top: 2.5rem;
    display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    text-align: left;
    // @media screen and (max-width: 1000px) {
    //         top: auto;
    //         bottom: 0;
    //     }
    @media screen and (max-width: 550px) {
        display: none;
    }
    ul{
        margin: 0;
        padding: 0.3rem 0;
        padding-left: 0.5rem;
        li{
            width: fit-content;
            list-style: none;
            padding: 0.4rem 0.5rem;
            border-bottom: 1px solid #ccc;
            text-decoration: none;
            color: $word-color;
            cursor: pointer;
            @media screen and (max-width: 1000px) {
                font-size: 0.9rem;
                
            }
            &:hover{
                color: #7e90a7;
            }
        }
        li.active{
            background-color: #B5B8A3;
            border-radius: 35px;
        }
    }
}



</style>
