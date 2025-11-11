<script setup>
import Specification from './Specification.vue'
const props = defineProps({
    flag:Array
});
</script>

<template>
    <section>
        <div class="specification">
            <h2>規格</h2>
            <Specification :flag="props.flag"/>
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
    @media screen and (max-width: 520px) {
        font-size: 1.8rem;
    }
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