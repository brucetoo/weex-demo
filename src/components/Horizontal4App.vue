<template>
    <div>
        <text class="title">{{title}}</text>
        <div class="items">
            <div class="item" v-for="app in appItem">
                <image :src="app.iconUrl" resize="cover" class="icon"></image>
                <text class="name">{{app.name}}</text>
                <text class="size">{{Math.round(app.size / 1000 * 100) / 100 + "Mb"}}</text>
                <text class="download">{{download}}</text>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Horizontal4App',
    props: ['appItem', 'title', 'download']
  }
</script>

<style scoped>
    .items {

        flex-direction: row;
        justify-content: space-around;
    }
    .item {
        align-items: center;
    }
    .title {
        font-size: 35px;
        color: #000;
        margin: 20px;
        font-weight: bold;
    }
    .icon {
        width: 120px;
        height: 120px;
        margin: 20px;
    }
    .name {
        font-size: 30px;
        color: #333333;
        font-weight: bold;
    }
    .size {
        font-size: 22px;
        color: #bbbbbb;
        margin-top: 5px;
    }
    .download {
        padding: 8px;
        border-radius: 20px;
        font-size: 30px;
        color: #ffffff;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 120px;
        background-color: #24c8af;
        text-align: center;
    }
</style>
