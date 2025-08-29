<script setup>
import Navbar from './Navbar.vue';
import CacheCard from './CacheCard.vue';
import { useSearchStore } from '../stores/useSearchStore';
// import { useIndexStore } from '../stores/useIndexStore';
import { useAnalysisStore } from '../stores/useAnalysisStore';
import axios from 'axios';
const searchStore = useSearchStore();
// const indexStore = useIndexStore();
const analysisStore = useAnalysisStore();

// function getIdIndex(index){
//   indexStore.setIndex(index);
// }

function handleAnalysis(index){
  // getIdIndex(index);
  //接分析
  console.log(searchStore.search_keyword, searchStore.matched_products[index].id);
  axios.post('https://api.xssearch.brid.pw/api/analysis/',{"keyword":searchStore.search_keyword,"product_id": searchStore.matched_products[index].id},{
      headers: {
        'Content-Type': 'application/json',
      },
  })
  .then(function(response){
    const data = response.data;
    console.log(data);
    analysisStore.saveAnalysisResults(data);
  })
  .catch(function(error){
    console.error(error);
  });
}
</script>

<template>
  <div class="searchPageCache">
    <Navbar />
    <div class="productCache">
        <CacheCard v-for="(item,index) in searchStore.matched_products_count" :key="index" @click="handleAnalysis(index)"/>
    </div>
    
  </div>
</template>


<style lang="scss" scoped>
.searchPageCache {
  background-image: url('../assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100vw;
  // background-attachment: fixed;
  // top: 0;
  // left: 0;
  position: relative;
  // padding: 2rem;
  .productCache{
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  justify-content: center;
  flex: auto;
  }
}


</style>
