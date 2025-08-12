<script setup>
import Navbar from './Navbar.vue';
import GoodBadSection from './goodBadSection.vue';
import WordcloudSection from './wordcloudSection.vue';
import CommendSection from './commendSection.vue';
import SpecificationSection from './specificationSection.vue';
import SideNavBar from './SideNavBar.vue';
import photoSection from './photoSection.vue';
import { useAnimations } from '../composables/useAnimations';
// import { useSearchStore } from '../stores/useSearchStore';
import { onMounted, ref } from 'vue';
const { fadeIn } = useAnimations();

// const searchStore = useSearchStore();
const sections = ref([
    {title:"優缺點"},
    {title:"文字雲"},
    {title:"評論"},
    {title:"規格"}
])
// const sectionRefs = ref(new Array(sections.value.length).fill(null));
let sectionRefs = [];
onMounted(()=>{
    sectionRefs = new Array(sections.value.length).fill(null)
    fadeIn('.searchResult')
})
const setSectionRefs=(el,index)=>{
    // el是組件實例，$el是組件的根元素
    if(el) sectionRefs[index] = el.$el
}



</script>

<template>
<div class="searchResult">
    <Navbar />
    <div>
        <photoSection/>
        <SideNavBar :items="sections" :sectionRefs="sectionRefs"/>
    </div>
    <div class="content">
        <section class="result">
            <!-- <GoodBadSection :ref="el=>{if(el) sectionRefs.value[0] = el}"/>
            <WordcloudSection :ref="el=>{if(el) sectionRefs.value[1] = el}"/>
            <CommendSection :ref="el=>{if(el) sectionRefs.value[2] = el}"/>
            <SpecificationSection :ref="el=>{if(el) sectionRefs.value[3] = el}"/> -->
            <GoodBadSection :ref="el=>setSectionRefs(el,0)"/>
            <WordcloudSection :ref="el=>setSectionRefs(el,1)"/>
            <CommendSection :ref="el=>setSectionRefs(el,2)"/>
            <SpecificationSection :ref="el=>setSectionRefs(el,3)"/>
        </section>
    </div>
</div>


</template>


<style lang="scss" scoped>
$word-color:#2F2F2F;
.searchResult{
    background-image: url('../assets/backGround2.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    width: 100vw;
    color: $word-color;
    .content{
        display: flex;
        // .result{
        // }
    }
    
    
}

</style>
