<script setup>
</script>

<template>
    <div class="compareProductCard">
        <div class="container">
            <div class="imgBox">
                <img src="../assets/iphone.jpg" alt="商品圖片">
            </div>
            <div class="info">
                <h2>iphone 15 pro max</h2>
                <p class="star"><i class="fa-regular fa-star"></i>4.0</p>
            </div>
        </div>
        <div class="container">
            <div class="imgBox">
                <img src="../assets/iphone.jpg" alt="商品圖片">
            </div>
            <div class="info">
                <h2>iphone 15 pro max</h2>
                <p class="star"><i class="fa-regular fa-star"></i>4.0</p>
            </div>
        </div>
        
    </div>


</template>


<style lang="scss" scoped>
$word-color: #2F2F2F;
.compareProductCard {
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    justify-content: center;
    align-items: center;
    color: $word-color;
    margin-top: 2rem;
    gap: 2rem;
    div.container{
        display: flex;
        background-color: white;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        // width: 30%;
        max-width: 600px;
        padding: 1rem   ;
        div.imgBox{
            width: 100%;
            height: 400px;
            min-width: 160px;
            overflow: hidden;
            border-radius: 20px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        div.info{
            width: 100%;
            text-align: left;
            margin-top: 1rem;
            h2{
                font-size: 1.5rem;
                font-weight: 500;
                @media screen and (max-width: 740px) {
                    font-size: 1.2rem;
                }
                @media screen and (max-width: 520px) {
                    font-size: 1rem;
                }
            }
            p.star{
                i{
                    color: #CC5F5A;
                }
            }
        }
    }
}

</style>
