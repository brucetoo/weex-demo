<template>
    <slider class="slider" auto-play="true" interval="5000" @change="onchange" infinite="false"
            clip-children="false" page-margin="40wx" margin-left="50wx" margin-right="50wx">
        <div class="frame" v-for="img in imageList">
            <image class="image" resize="cover" :src="img.src" @click="onClick"></image>
        </div>
        <indicator class="indicator"></indicator>
    </slider>
</template>
<style scoped>
    .iconfont {
        font-family: iconfont;
    }

    .slider {
        width: 750px;
        height: 430px;
    }

    .frame {
        width: 630px;
        height: 430px;
        background-color: coral;
    }

    .image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .indicator {
        width: 650px;
        height: 40px;
        item-color: white;
        item-selected-color: #b4282d;
        item-size: 12px;
        position: absolute;
        bottom: 10px;
        right: 0px;
    }
</style>
<script>
  export default {
    props: ["imageList"],
    data() {
      return {}
    },
    methods: {
      onchange(event) {
      },
      onClick(e) {
        this.POST('https://galaxy.pp.cn/proxy/api-op.content.getArticleDetail', {
          identity: '9918766512075107655'
        }, res => {
          this.Toast('....' + JSON.stringify(res.data))
        })
      }
    }
  }
</script>