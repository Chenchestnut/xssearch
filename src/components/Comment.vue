<script setup>
</script>

<template>
<div class="commentElement">
    <div class="avatar"></div>
    <div class="content">
        <p>User：大強</p>
        <div class="star">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        </div>
        <p>相機控制按鍵設計不佳，使用起來不符合人體工學</p>
    </div>
</div>
</template>


<style  lang="scss" scoped>
$word-color:#2F2F2F;
.commentElement{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 60%;
    border-radius: 35px;
    padding: 1.5rem 1rem;
    // margin-bottom: 1.5rem;
    background-color: #caccd3;
    color: $word-color;
    .avatar{
        width: 40px;
        height: 40px;
        background-color: #B5B8A3;
        border-radius: 50%;
        margin-right: 0.5rem;
    }
    .content{
        display: flex;
        flex-direction: column;
        text-align: left;
        p{
            font-size: 1rem;
            padding: 0.5rem 0;
        }
        .star{
            display: flex;
            i{
                color: #d88f8a;
                padding-right: 0.2rem;
            }
        }
    }
}

</style>
