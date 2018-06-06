<template>
    <div @appear="onAppear(app)">
        <text :class="['download', active ? 'downloadBlue' : '']" @click="onDownloadClick(app)">{{download}}</text>
    </div>
</template>

<script>
const native = weex.requireModule('WeexModule')
export default {
  name: 'DownloadButton',
  props: ['app'],
  data () {
    return {
      download: '.下载.',
      uniqueId: 0,
      state: -1,
      active: false
    }
  },
  created: function () {
    var globalEvent = weex.requireModule('globalEvent')
    var self = this
    globalEvent.addEventListener('appStatusChange', function (map) {
      var func = map.function
      native.logger('appStatusChange:' + ' func:' + func + ' state:' + map.state + ' map.uniqueId:' + map.uniqueId + ' uniqueId:' + self.uniqueId)
      if (map.uniqueId === self.uniqueId) {
        if (func === 'onResStateChanged2') {
          self.state = map.state
          switch (self.state) {
            case 102:
            case 104:
              self.download = '下载'
              self.active = false
              break
            case 103:
            case 152:
            case 119:
              self.download = '更新'
              self.active = false
              break
            case 106:
              self.download = '打开'
              self.active = false
              break
            case 107:
            case 108:
            case 110:
            case 141:
            case 151:
              self.download = '安装'
              self.active = false
              break
            case 131:
              self.download = '安装中'
              self.active = false
              break
          }
        } else if (func === 'onProgressChanged') {
          self.download = Math.round(map.curProgress * 100) / 100 + '%'
        } else if (func === 'onResStateChanged1') {
          self.state = map.state
          switch (self.state) {
            case 1:
            case 2:
              self.download = '暂停'
              self.active = false
              break
            case 3:
            case 5:
              self.download = '继续'
              self.active = true
              break
            case 4:
              self.download = '安装'
              self.active = false
              break
          }
        }
      }
    })
  },
  methods: {
    onDownloadClick: function (app) {
      native.onDownloadClick(app, this.state)
    },
    onAppear: function (app) {
      var self = this
      native.getUniqueId(app, function (map) {
        native.logger('getUniqueId: ' + map.uniqueId)
        self.uniqueId = map.uniqueId
      })
      native.onRecommendAppear(app)
    }
  }
}
</script>

<style scoped>
    .download {
        padding: 8px;
        border-radius: 30px;
        font-size: 30px;
        color: #ffffff;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 120px;
        background-color: #24c8af;
        text-align: center;
    }
    .downloadBlue {
        padding: 8px;
        border-radius: 30px;
        font-size: 30px;
        color: #ffffff;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 120px;
        background-color: #4E91EA;
        text-align: center;
    }
</style>
