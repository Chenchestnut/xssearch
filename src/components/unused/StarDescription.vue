<script setup>

</script>

<template>
    <div class="starDescription">
        <p>momo&pchome所有對於該商品星級平均</p>
    </div>
</template>


<style lang="scss" scoped>
div.starDescription{
    min-width: 250px;
    padding: 0.5rem;
    background-color: #e9dfd8;
    border-radius: 15px;
    opacity: 0;
    transform: translateY(-10px) scale(0.9);
    animation: starDescriptionFadeIn 0.3s ease-out forwards;
    p{
        font-size: 0.8rem;
        color: #2F2F2F;
        text-align: center;
        // @media screen and (max-width: 520px) {
        //     font-size: 1rem;
        // }
    }
}
@keyframes starDescriptionFadeIn {
    from{
        opacity: 0;
        transform: translateY(-10px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>