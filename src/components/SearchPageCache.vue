<script setup>
import Navbar from './Navbar.vue';
import CacheCard from './CacheCard.vue';
</script>

<template>
  <div class="searchPageCache">
    <Navbar />
    <div class="productCache">
        <CacheCard />
        <CacheCard />
        <CacheCard />
        <CacheCard />
        <CacheCard />
        <CacheCard />
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
