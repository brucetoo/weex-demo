<template>
    <list>
        <cell v-for="item in listData.data.content">
            <slider v-if="item.cardType === '23_63'" class="slider" interval="4000" auto-play="true" >
                <div class="frame" v-for="image in item.exData.content">
                    <image class="image" resize="cover" :src="image.imageUrl" v-on:click="onBannerClick(image)" ></image>
                </div>
            </slider>

            <div v-if="item.cardType === '23_75'">
                <horizontal3Card  :cards="item.exData.content"></horizontal3Card>
            </div>

            <div v-if="item.cardType === '23_77'">
                <horizontal4App :download="download"
                                :appItem="item.exData.content[0].apps"
                                :title="item.exData.content[0].name">
                </horizontal4App>
            </div>

            <div v-if="item.cardType === '23_35'">
                <horizontalScrollCard :appItem="item.exData.content[0].apps"
                                      :bgUrl="item.exData.content[0].imageUrl"
                                      :title="item.exData.content[0].name">
                </horizontalScrollCard>
             </div>
        </cell>
    </list>
</template>

<style>
    .frame {
        height: 280px;
    }
    .image {
        height: 280px;
        border-radius: 10px;
        padding: 20px;
    }
    .slider {
        margin-top: 10px;
        height: 280px;
        border-radius: 10px;
    }
</style>

<script>
// eslint-disable-next-line indent
  /* eslint-disable indent,vue/no-shared-component-data */

  import horizontal3Card from './components/Horizontal3Card.vue'
  import horizontal4App from './components/Horizontal4App.vue'
  import horizontalScrollCard from './components/HorizontalScrollCard'

  import data from './data.json'
const native = weex.requireModule('WeexModule')
const modal = weex.requireModule('modal')
  export default {
    components: {horizontal3Card, horizontal4App, horizontalScrollCard},
    data () {
      return {
        listData: data, // json字符串直接赋值
        download: '下载'
      }
    },
    methods: {
      onBannerClick: function (image) {
        modal.toast({
          message: image.imageUrl,
          duration: 0.5
        })
        native.logger(image)
        native.onBannerClick(image)
      }
    }
  }

</script>
