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
const sections = ref([
    {title:"推薦理由"},
    {title:"優缺點"},
    {title:"文字雲"},
    {title:"評論"},
    {title:"規格"}
])
let sectionRefs = [];

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
    <SideNavBar :items="sections" :sectionRefs="sectionRefs"/>
    <div class="recommendResult">
        <Navbar />
        <aside>
            <photoSection/>
        </aside>
        <div class="content">
            <section class="result">
                <ReasonSection :ref="el=>setSectionRefs(el,0)"/>
                <GoodBadSection :ref="el=>setSectionRefs(el,1)"/>
                <WordcloudSection :ref="el=>setSectionRefs(el,2)"/>
                <CommendSection :ref="el=>setSectionRefs(el,3)"/>
                <SpecificationSection :ref="el=>setSectionRefs(el,4)"/>
            </section>
        </div>
    </div>
</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.recommendResult {
background-image: url('../assets/backGround2.png');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
// background-attachment: fixed;
min-height: 100vh;
width: 100%;
color: $word-color;
}
</style>
