<template>
    <div class="parent">
        <div v-for="card in cards" class="items">
            <div class="item" v-on:click="onH3CardClick(card)">
                <image class="image" :src="card.imageUrl" resize="cover"></image>
                <text class="text" >{{card.name}}</text>
            </div>
        </div>
    </div>
</template>

<script>
const native = weex.requireModule('WeexModule')
const modal = weex.requireModule('modal')
export default {
  name: 'Horizontal3Card',
  props: ['cards'],
  methods: {
    onH3CardClick: function (card) {
      modal.toast({
        message: card.imageUrl,
        duration: 0.5
      })
      native.onH3CardClick(card)
      native.logger(card)
    }
  }
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
        height: 120px;
        width: 220px;
        border-radius: 10px;
        margin: 10px;
    }
    .text {
        text-align: center;
        height: 40px;
        width: 150px;
        font-size: 20px;
        font-weight: bold;
        color: #111;
        border-radius: 5px;
        background-color: #eeeeee;
        position: relative;
        bottom: 30px;
        padding-top: 8px;
        margin-left: 50px;
    }
</style>
