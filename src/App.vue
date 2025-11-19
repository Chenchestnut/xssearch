<script setup>
import TokenDebugInfo from './components/TokenDebugInfo.vue'
// import HomePage from './components/HomePage.vue'
</script>

<template>
  <router-view />
  <!-- Token 除錯資訊（只在開發環境顯示） -->
  <TokenDebugInfo />
</template>


<style lang="scss" scoped>

</style>
