<script setup>
import Navbar from './Navbar.vue';
import CacheCard from './CacheCard.vue';
import { useSearchStore } from '../stores/useSearchStore';
import { useWordCloudStore } from '../stores/useWordCloudStore';
const searchStore = useSearchStore();
const wordCloudStore = useWordCloudStore();

function getWordCloudIndex(index){
  wordCloudStore.setWordCloudIndex(index);
}
</script>

<template>
  <div class="searchPageCache">
    <Navbar />
    <div class="productCache">
        <CacheCard v-for="(item,index) in searchStore.matched_products_count" :key="index" @click="getWordCloudIndex(index)"/>
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
