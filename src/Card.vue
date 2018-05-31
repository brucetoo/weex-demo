<template recyclable>
    <div class="card">
        <div v-for="card in cards" class="single">
            <text class="title">card.name</text>
            <image class="background" :src="card.imageUrl"></image>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['cards']
  }
</script>

<style scoped>
    .card {
        margin: 20px;
        height: 150px;
    }
    .single {
        flex: 1;
    }
    .background {

    }
    .title {
        text-align: center;
        height: 30px;
        font-size: 20px;
        color: #111;
        background-color: #888;
        padding: 5px;
    }
</style>
