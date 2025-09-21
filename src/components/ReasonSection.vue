<script setup>

</script>

<template>
    <div class="reason">
        <div class="box">
            <h2 class="title">推薦理由</h2>
            <div class="reasonContent">
                <p>這款手機擁有出色的性能和優雅的設計，無論是拍照還是遊戲都能輕鬆應對。</p>
            </div>
        </div>
    </div>
    <hr>
</template>


<style lang="scss" scoped>
hr{
    width: 85%;
}
div.reason{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    div.box{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h2.title{
        font-size: 2rem;
        font-weight: bold;
        // text-align: center;
        // padding-top:1.5rem ;
        }
        div.reasonContent{
            background-color: #7E90A7;
            color: white;
            width: 100%;
            padding: 1.5rem 2rem;
            border-radius: 35px;
            margin: 2rem 0;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
            @media screen and (max-width: 520px) {
                min-width: 290px;
            }
            p{
                font-size: 1rem;
                text-align: left;
            }
        }
    }
    
}
</style>
