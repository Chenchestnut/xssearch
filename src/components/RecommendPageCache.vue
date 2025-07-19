<script setup>
import Navbar from './Navbar.vue';
import RecommendCacheCard from './RecommendCacheCard.vue';
</script>

<template>
    <div class="recommendPageCache">
        <Navbar />
        <RecommendCacheCard />
        <RecommendCacheCard />
        <RecommendCacheCard />
        <RecommendCacheCard />
        <RecommendCacheCard />
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
