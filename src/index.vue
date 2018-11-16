<template>
    <list>
        <cell v-for="item in listData" :key="item">
            <slider v-if="item.cardType === '23_63'" class="slider" interval="4000" auto-play="true">
                <div class="frame" v-for="image in item.exData.content" :key="image">
                    <image class="image" resize="cover" :src="image.imageUrl" v-on:click="onBannerClick(image)"></image>
                </div>
            </slider>

            <div v-if="item.cardType === '23_75'">
                <horizontal3Card :cards="item.exData.content"></horizontal3Card>
            </div>

            <div v-if="item.cardType === '23_77'">
                <horizontal4App :appItem="item.exData.content[0].apps"
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
        <loading class="loading" @loading="onLoadingMore" :display="isLoading ? 'show' : 'hide'" >
            <text class="indicator-text">Loading ...</text>
        </loading>
    </list>
</template>

<style scoped>
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
    .loading {
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }
    .indicator-text {
        color: #888888;
        font-size: 42px;
        text-align: center;
    }
</style>

<script>
  // eslint-disable-next-line indent
  /* eslint-disable indent,vue/no-shared-component-data */

  import horizontal3Card from './components/Horizontal3Card.vue'
  import horizontal4App from './components/Horizontal4App.vue'
  import horizontalScrollCard from './components/HorizontalScrollCard'

  import dataDefault from './data.json'

  const native = weex.requireModule('WeexModule')
  const modal = weex.requireModule('modal')
  export default {
    components: {horizontal3Card, horizontal4App, horizontalScrollCard},
    data () {
      return {
        listData: dataDefault.data.content, // json字符串直接赋值
        isLoading: false,
        currentPage: 0
      }
    },
    beforeCreate: function () {
      native.logger('beforeCreate: function')
    },
    created: function () {
      native.logger('created: function')
      var globalEvent = weex.requireModule('globalEvent')
      var self = this
      globalEvent.addEventListener('requestEvent', function (map) {
        native.logger('requestEvent triggered requestUrl:' + map.requestUrl)
        var stream = weex.requireModule('stream')
        native.logger('requestEvent triggered requestJson: ' + map.requestJson)
        stream.fetch({
              method: 'POST',
              type: 'json',
              url: map.requestUrl,
              body: map.requestJson
            }, function (ret) {
              native.logger('request end....' + ret.status + ' ok ? ' + ret.ok)
              if (!ret.ok) {
                native.logger(map.requestUrl + ' request failed.........')
              } else {
                native.logger(map.requestUrl + ' request success........')
                self.listData = ret.data.data.content
              }
            }, function (response) {
             // progress...
            }
        )
      })
    },
    methods: {
      onBannerClick: function (image) {
        modal.toast({
          message: image.imageUrl,
          duration: 0.5
        })
        native.logger(image)
        native.onBannerClick(image)
      },
      onLoadingMore () {
        this.isLoading = true
        setTimeout(() => {
          // 模拟假数据..
          this.listData = this.listData.concat(dataDefault.data.content)
          this.isLoading = false
        }, 2000)
      }

    }
  }

</script>
