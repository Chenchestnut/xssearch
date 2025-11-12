<script setup>
import Navbar from './Navbar.vue';
import photoSection from './photoSection.vue';
import SideNavBar from './SideNavBar.vue';
import ReasonSection from './ReasonSection.vue';
import GoodBadSection from './goodBadSection.vue';
import WordcloudSection from './wordcloudSection.vue';
import CommendSection from './commendSection.vue';
import SpecificationSection from './specificationSection.vue';
import { onMounted, ref } from 'vue';
import { useAnimations } from '../composables/useAnimations';
import { useRecommendStore } from '../stores/useRecommendStore';
import { useIndexStore } from '../stores/useIndexStore';
const sections = ref([
    {title:"推薦理由"},
    {title:"優缺點"},
    {title:"文字雲"},
    {title:"評論"},
    {title:"規格"}
])
let sectionRefs = ref([]);
const recommendStore = useRecommendStore();
const indexStore = useIndexStore();

const { fadeIn } = useAnimations();
onMounted(()=>{
    sectionRefs = new Array(sections.value.length).fill(null)
    fadeIn('.recommendResult')
})
const setSectionRefs=(el,index)=>{
    // el是組件實例，$el是組件的根元素
    if(el) sectionRefs[index] = el.$el
}
</script>

<template>
    <div class="backGround"></div>
    <SideNavBar :items="sections" :sectionRefs="sectionRefs"/>
    <Navbar />
    <div class="recommendResult">
        <aside>
            <photoSection :img="recommendStore.recommendation[indexStore.index].img"/>
        </aside>
        <div class="content">
            <section class="result">
                <ReasonSection :ref="el=>setSectionRefs(el,0)"/>
                <GoodBadSection :ref="el=>setSectionRefs(el,1)"/>
                <WordcloudSection :ref="el=>setSectionRefs(el,2)"/>
                <CommendSection :ref="el=>setSectionRefs(el,3)"/>
                <SpecificationSection :ref="el=>setSectionRefs(el,4)" :flag="recommendStore.recommendation[indexStore.index].spec"/>
            </section>
        </div>
    </div>    
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.backGround{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-image: url('../assets/backGround2.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // background-attachment: fixed;
    z-index: -100;
}
.recommendResult {
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    // overflow-x: hidden;
    color: $word-color;
    background: transparent;
}
section.result{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
