<script setup>
import Navbar from './Navbar.vue';
import RecommendCacheCard from './RecommendCacheCard.vue';
import { useAlert } from '../SweetAlert';
import axios from 'axios';
import { useRouter } from 'vue-router';
import{ useIndexStore } from '../stores/useIndexStore';
import { useRecommendStore } from '../stores/useRecommendStore';
import { useAnalysisStore } from '../stores/useAnalysisStore';
const { showLoading, closeLoading} = useAlert();
const recommendStore = useRecommendStore();
const indexStore = useIndexStore();
const analysisStore = useAnalysisStore();
const router = useRouter();

function getIdIndex(index){
  indexStore.setIndex(index);
}

function handleAnalysis(index){
  getIdIndex(index);
  //接分析
  console.log(recommendStore.recommendation[index].name, recommendStore.recommendation[index].id);
  showLoading('努力分析中...')
  axios.post('https://api-xssearch.brid.pw/api/analysis/',{"keyword":recommendStore.recommendation[index].name,"product_id": recommendStore.recommendation[index].id},{
      headers: {
        'Content-Type': 'application/json',
      },
  })
  .then(function(response){
    const data = response.data;
    console.log(data);
    analysisStore.saveAnalysisResults(data);
    closeLoading();
    router.push('/recommendResult');
  })
  .catch(function(error){
    console.error(error);
  });
}
</script>

<template>
    <div class="recommendPageCache">
        <Navbar />
        <RecommendCacheCard v-for="(item, index) in recommendStore.recommendation" :key="item.id" :item="item"  :name="item.name" :img="item.img" :reason="item.reason" @click="handleAnalysis(index)"/>
    </div>

</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.recommendPageCache {
    background-image: url('../assets/backGround2.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    width: 100vw;
    color: $word-color;
}
</style>
