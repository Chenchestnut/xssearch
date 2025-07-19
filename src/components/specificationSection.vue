<script setup>
import Specification from './Specification.vue'
</script>

<template>
    <section>
        <div class="specification">
            <h2>規格</h2>
            <Specification />
        </div>
    </section>
</template>


<style lang="scss" scoped>
hr{
    width: 85%;
}
h2.title{
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
    padding-top:1.5rem ;
}
div.specification{
    h2{
        font-size: 2rem;
        font-weight: bold;                  
        padding-top:1.5rem ;
        text-align: center;
        margin-bottom: 1.5rem;
    }
}
</style>