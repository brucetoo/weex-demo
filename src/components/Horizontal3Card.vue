<template>
    <div class="parent">
        <div v-for="card in cards" class="items">
            <div class="item">
                <image class="image" :src="card.imageUrl" resize="cover"></image>
                <text class="text" >{{card.name}}</text>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Horizontal3Card',
    props: ['cards']
  }
</script>

<style scoped>
    .items{
        flex:1;
    }
    .parent{
        height:150px;
        flex-direction: row;
        margin: 10px;
    }
    .image {
        height: 125px;
        width: 220px;
        border-radius: 10px;
        margin: 10px;
    }
    .text {
        text-align: center;
        height: 34px;
        width: 150px;
        font-size: 20px;
        font-weight: bold;
        color: #111;
        border-radius: 5px;
        background-color: #eeeeee;
        position: relative;
        bottom: 30px;
        padding-top: 5px;
        margin-left: 50px;
    }
</style>
