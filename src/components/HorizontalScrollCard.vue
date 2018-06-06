<template>
    <div class="item">
        <image :src="bgUrl" resize="cover" class="background"></image>
        <text class="title">{{title}}</text>
        <scroller class="scroller" scroll-direction="horizontal">
            <div class="scroller-item" v-for="app in appItem">
                <image :src="app.iconUrl" resize="cover" class="icon"></image>
                <text class="appName">{{app.name}}</text>
                <text class="download">{{download}}</text>
            </div>
        </scroller>
    </div>
</template>

<script>
  export default {
    name: 'HorizontalScrollCard.vue',
    props: ['title', 'bgUrl', 'appItem'],
    data () {
      return {
        download: '下载'
      }
    }
  }
</script>

<style scoped>
    .item {
        height: 420px;
    }
    .title {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 35px;
        color: #fff;
        font-weight: bold;
    }
    .background {
        height: 420px;
    }
    .scroller {
        position: absolute;
        top: 80px;
        padding-left: 250px;
        flex-direction: row;
    }
    .scroller-item {
        padding: 20px;
        width: 200px;
        height: 300px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 30px;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
    .appName {
        text-align: center;
        font-weight: bold;
        lines: 1;
        text-size: 12px;
    }
    .icon {
        width: 120px;
        height: 120px;
        margin: 20px;
    }
    .download {
        padding: 5px;
        border-radius: 30px;
        font-size: 30px;
        color: #ffffff;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 120px;
        background-color: #24c8af;
        text-align: center;
    }
</style>
