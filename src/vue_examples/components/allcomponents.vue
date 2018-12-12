<template>
    <!--pagingEnabled="true" pageSize="400"-->
    <waterfall class="list"
               :style="{padding:padding}"
               :show_scrollbar="showScrollbar"
               :column-count="columnCount"
               :column-gap="columnGap"
               :column-width="columnWidth"
               :scrollable="scrollable"
               @scroll="recylerScroll">
        <refresh class="refresh" :style="{height:refreshViewHeight}" @refresh="onrefresh" @pullingdown="onpullingdown"
                 :display="refreshing ? 'show' : 'hide'">
            <loading-indicator class="indicator" color="blue"></loading-indicator>
            <text class="refreshText">{{refreshText}}</text>
        </refresh>

        <!--<cell v-for="item in listItems">-->
        <!--<text class="single-txt" @click="onclick">{{"index:" + item}}</text>-->
        <!--</cell>-->

        <header style="position: relative;padding-bottom: 18px;" ref="firstHeader" v-if="showHeader">
            <div class="banner">
                <div class="bannerInfo">
                    <image class="avatar" src="https://gw.alicdn.com/tps/TB1EP9bPFXXXXbpXVXXXXXXXXXX-150-110.jpg"
                           resize="cover"></image>
                    <text class="name">Adam Cat</text>
                    <div class="titleWrap">
                        <text class="title">Genius</text>
                    </div>
                </div>
                <div class="bannerPhotoWrap">
                    <image class="bannerPhoto" v-for="photo in banner.photos" :src="photo.src"></image>
                </div>
            </div>
        </header>

        <!--动态网格的一种实现方法，而使用的 flex-wrap属性 -->
        <header style="margin-bottom: 18px">
            <div style="flex-direction: column">
                <text class="header2TextTitle">THIS IS TITLE</text>
            </div>
            <div style="padding-top: 20px;background-color: cornsilk;margin-left: 12px;margin-right: 12px">
                <div style="margin-bottom: 20px;" v-for="row in getRowCount()">
                    <div style="flex-direction: row;">
                        <text :class="['header2TextItem', getIndexNumber(row,index) < listItems.length ? 'header2TextItemColor' : '']"
                              v-for="index in 3">{{listItems[getIndexNumber(row,index)]}}
                        </text>
                    </div>
                </div>
            </div>
        </header>

        <!--使用flex-wrap属性-->
        <header style="margin-bottom: 18px;">
            <div style="flex-direction: column">
                <text class="header2TextTitle">THIS IS TITLE FOR FLEX-WRAP</text>
            </div>
            <div class="headerFlexWrap">
                <text class="header2TextItemFlexWrap" v-for="item in listItems">{{item}}</text>
            </div>
        </header>

        <!--sticky header 94px-->
        <header class="stickyHeader">
            <div v-if="stickyHeaderType === 'none'" class="stickyWrapper">
                <text class="stickyText">Sticky Header</text>
            </div>
            <div v-if="stickyHeaderType === 'appear'" class="stickyWrapper">
                <div class="stickyTextImageWrapper">
                    <text class="stickyText">Last Appear:</text>
                    <image class="stickyImage" :src="appearImage"></image>
                </div>
                <div class="stickyTextImageWrapper">
                    <text class="stickyText">Last Disappear:</text>
                    <image class="stickyImage" :src="disappearImage"></image>
                </div>
            </div>
            <div v-if="stickyHeaderType === 'scroll'" class="stickyWrapper">
                <text class="stickyText">Content Offset:{{contentOffset}}</text>
            </div>
        </header>

        <header style="padding-top: 10px" @click="fetch">
            <panel type="primary" title="STREAM MODULE" paddingBody="10px" paddingHead="10px">
                <text style="color: #00B4FF; font-size: 30px">{{streamText}}</text>
            </panel>
        </header>

        <header ref="animate_header" style="margin-bottom: 10px" @click="animate">
            <panel type="primary" :title="animationHint" paddingBody="10px" paddingHead="10px"></panel>
        </header>

        <cell v-for="(item, index) in items" v-bind:key="index" :ref="`cell${index}`" class="cell">
            <div style="align-items: center; background-color: cornflowerblue"
                 @click="onItemClick(item.behaviour, index)"
                 @appear="itemAppear(item.src)"
                 @disappear="itemDisappear(item.src)">
                <text v-if="item.name" class="itemName">{{item.name}}</text>
                <image class="itemPhoto" :src="item.src"></image>
                <text v-if="item.desc" class="itemDesc">{{item.desc}}</text>
                <text v-if="item.behaviourName" class="itemClickBehaviour"> {{item.behaviourName}}</text>
            </div>
        </cell>

        <div class="fixedItem" @click="scrollToTop">
            <text class="fixedText">Top</text>
        </div>
    </waterfall>
</template>

<script>
  var stream = weex.requireModule('stream');
  var animation = weex.requireModule('animation');
  export default {
    name: "allcomponents",
    data: function() {
      const items = [
        {
          src:'https://gw.alicdn.com/tps/TB1Jl1CPFXXXXcJXXXXXXXXXXXX-370-370.jpg',
          name: 'Thomas Carlyle',
          desc:'Genius only means hard-working all one\'s life',
          behaviourName: 'Change count',
          behaviour: 'changeColumnCount'
        },
        {
          src:'https://gw.alicdn.com/tps/TB1Hv1JPFXXXXa3XXXXXXXXXXXX-370-370.jpg',
          desc:'The man who has made up his mind to win will never say "impossible "',
          behaviourName: 'Change gap',
          behaviour: 'changeColumnGap'
        },
        {
          src:'https://gw.alicdn.com/tps/TB1eNKuPFXXXXc_XpXXXXXXXXXX-370-370.jpg',
          desc:'There is no such thing as a great talent without great will - power',
          behaviourName: 'Show scrollbar',
          behaviour: 'showScrollbar',
        },
        {
          src:'https://gw.alicdn.com/tps/TB1DCh8PFXXXXX7aXXXXXXXXXXX-370-370.jpg',
          name:'Addison',
          desc:'Cease to struggle and you cease to live',
          behaviourName: 'Change width',
          behaviour: 'changeColumnWidth',
        },
        {
          src:'https://gw.alicdn.com/tps/TB1ACygPFXXXXXwXVXXXXXXXXXX-370-370.jpg',
          desc:'A strong man will struggle with the storms of fate',
          behaviourName: 'Listen appear',
          behaviour: 'listenAppear',
        },
        {
          src:'https://gw.alicdn.com/tps/TB1IGShPFXXXXaqXVXXXXXXXXXX-370-370.jpg',
          name:'Ruskin',
          desc:'Living without an aim is like sailing without a compass',
          behaviourName: 'Set scrollable',
          behaviour: 'setScrollable',
        },
        {
          src:'https://gw.alicdn.com/tps/TB1xU93PFXXXXXHaXXXXXXXXXXX-240-240.jpg',
          behaviourName: 'waterfall padding',
          behaviour: 'setPadding',
        },
        {
          src:'https://gw.alicdn.com/tps/TB19hu0PFXXXXaXaXXXXXXXXXXX-240-240.jpg',
          name:'Balzac',
          desc:'There is no such thing as a great talent without great will - power',
          behaviourName: 'listen scroll',
          behaviour: 'listenScroll',
        },
        {
          src:'https://gw.alicdn.com/tps/TB1ux2vPFXXXXbkXXXXXXXXXXXX-240-240.jpg',
          behaviourName: 'Remove cell',
          behaviour: 'removeCell',
        },
        {
          src:'https://gw.alicdn.com/tps/TB1tCCWPFXXXXa7aXXXXXXXXXXX-240-240.jpg',
          behaviourName: 'Move cell',
          behaviour: 'moveCell',
        }
      ]

      let repeatItems = [];
      for (let i = 0; i < 3; i++){
        repeatItems.push(...items)
      }

      return {
        showScrollbar: true,
        columnCount: 2,
        columnGap: 8,
        padding: 0,
        columnWidth: 'auto',
        contentOffset: '0',
        refreshing: false,
        refreshViewHeight: 128,
        refreshText: '↓   pull to refresh...',
        showHeader: true,
        listItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        needBgColor: false,
        stickyHeaderType: 'none',
        appearImage: null,
        scrollable: true,
        disappearImage: null,
        animationHint: 'Animation',
        startAnimate: true,
        transformer: 'rotate(45deg) translate(10%,10%) scale(0.8,0.8)',
        banner: {
          photos: [
            {src: 'https://gw.alicdn.com/tps/TB1JyaCPFXXXXc9XXXXXXXXXXXX-140-140.jpg'},
            {src: 'https://gw.alicdn.com/tps/TB1MwSFPFXXXXbdXXXXXXXXXXXX-140-140.jpg'},
            {src: 'https://gw.alicdn.com/tps/TB1U8avPFXXXXaDXpXXXXXXXXXX-140-140.jpg'},
            {src: 'https://gw.alicdn.com/tps/TB17Xh8PFXXXXbkaXXXXXXXXXXX-140-140.jpg'},
            {src: 'https://gw.alicdn.com/tps/TB1cTmLPFXXXXXRXXXXXXXXXXXX-140-140.jpg'},
            {src: 'https://gw.alicdn.com/tps/TB1oCefPFXXXXbVXVXXXXXXXXXX-140-140.jpg'}
          ]
        },
        items: repeatItems,
        streamText: "Clike me to request",
      }
    },
    //引入组件
    components: {
      panel: require('../include/panel.vue')
    },
    methods: {
      animate(e) {
        var self = this
        animation.transition(this.$refs.animate_header,{
          styles: {
            transform: self.transformer,
            transformOrigin: 'left bottom',
            // width: '200px',
            // height: '200px',
            backgroundColor: 'rgb(217, 83, 79)',
            opacity: self.startAnimate ? 0.5 : 1
          },
          duration: 2000,
          timingFunction: 'ease-in',
          delay: 0
        },function () {
          self.startAnimate = !self.startAnimate;
          if(self.startAnimate){
            self.animationHint = 'StartAnimation',
            self.transformer = 'rotate(45deg) translate(10%,10%) scale(0.8,0.8)'
          }else {
            self.animationHint = 'EndAnimation'
            self.transformer = 'rotate(0deg) translate(0%,0%) scale(1,1)'
          }
        })
      },
      fetch(e) {
        var self = this
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: 'http://httpbin.org/get'
        }, function (result) {
          if(result.ok){
            self.streamText = JSON.stringify(result.data)
          }
        },function (responce) {
          self.streamText = JSON.stringify(responce.length)
        })
      },

      recylerScroll: function(e) {
        this.contentOffset = e.contentOffset.y
      },
      getRowCount() {
        return this.listItems.length % 3 === 0 ? this.listItems.length / 3 : Math.floor(this.listItems.length / 3) + 1;
      },

      getIndexNumber(row, index) {
        return (row - 1) * 3 + index - 1;
      },

      onrefresh(e) {
        this.refreshing = true;
        this.refreshText = "loading...";
        setTimeout(() => {
          this.refreshing = false;
          this.refreshText = "↓   pull to refresh..."
        }, 2000)
      },

      onpullingdown(e) {
        if (e.pullingDistance > this.refreshViewHeight) {
          this.refreshText = '↑   release to refresh...'
        } else {
          this.refreshText = '↓   pull to refresh...'
        }
      },
      scrollToTop(e) {
        weex.requireModule('dom').scrollToElement(this.$refs.firstHeader )
      },

      onItemClick: function (behaviour, index) {
        console.log(`click...${behaviour} at index ${index}`)
        switch (behaviour) {
          case 'changeColumnCount':
            this.changeColumnCount()
            break
          case 'changeColumnGap':
            this.changeColumnGap()
            break
          case 'changeColumnWidth':
            this.changeColumnWidth()
            break
          case 'showScrollbar':
            this.showOrHideScrollbar()
            break
          case 'listenAppear':
            this.listenAppearAndDisappear()
            break
          case 'setScrollable':
            this.setScrollable()
            break
          case 'setPadding':
            this.setRecyclerPadding()
            break
          case 'listenScroll':
            this.listenScrollEvent()
            break
          case 'removeCell':
            this.removeCell(index)
            break
          case 'moveCell':
            this.moveCell(index)
            break
        }
      },
      itemAppear: function(src) {
        this.appearImage = src;
      },

      itemDisappear: function(src) {
        this.disappearImage = src;
      },

      changeColumnCount: function() {
        console.log("onItem click changeColumnCount: " + this.columnCount)
        if (this.columnCount === 2) {
          this.columnCount = 3
        } else {
          this.columnCount = 2
        }
      },

      changeColumnGap: function() {
        console.log("onItem click changeColumnGap: " + this.columnGap)
        if (this.columnGap === 12) {
          this.columnGap = 8
        } else {
          this.columnGap = 12
        }
      },

      changeColumnWidth: function() {
        if (this.columnWidth === 'auto') {
          this.columnWidth = 600
        } else {
          this.columnWidth = 'auto'
        }
      },

      showOrHideScrollbar: function() {
        this.showScrollbar = !this.showScrollbar
      },

      setScrollable: function() {
        this.scrollable = !this.scrollable
      },

      listenAppearAndDisappear: function() {
        this.stickyHeaderType = (this.stickyHeaderType === 'appear' ? 'none' : 'appear')
      },

      listenScrollEvent: function() {
        this.stickyHeaderType = (this.stickyHeaderType === 'scroll' ? 'none' : 'scroll')
      },

      setRecyclerPadding: function() {
        this.padding = (this.padding === 0 ? 12 : 0);
      },

      removeCell: function(index) {
        this.items.splice(index, 1)
      },

      moveCell: function(index) {

        if (index == 0) {
          this.items.splice(this.items.length - 1, 0, this.items.splice(index, 1)[0]);
        } else {
          this.items.splice(0, 0, this.items.splice(index, 1)[0]);
        }
      }
    }
  }
</script>

<style scoped>

    .stickyHeader {
        position: sticky;
        height: 94px;
        flex-direction: row;
        padding-bottom:6px;
    }
    .stickyWrapper {
        flex-direction: row;
        background-color:#00cc99;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
    .stickyTextImageWrapper {
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
    .stickyText {
        color: #FFFFFF;
        font-weight: bold;
        font-size: 32px;
    }
    .stickyImage {
        width: 64px;
        height: 64px;
        border-radius: 32px;
    }
    .fixedItem {
        position: fixed;
        width: 78px;
        height: 78px;
        background-color: #00cc99;
        right: 32px;
        bottom: 32px;
        /*右下角的位置 */
        border-radius: 39px;
        justify-content: center;
        align-items: center;
    }
    .fixedText {
        font-size: 36px;
        color: white;
        line-height: 36px;
    }
    .headerFlexWrap {
        padding-top: 20px;
        background-color: cornsilk;
        margin-left: 12px;
        margin-right: 12px;
        flex-direction: row;
        flex-wrap: wrap;
        /*weex 不支持flex的这中缩写方式*/
        /*flex-flow: row wrap;*/
    }

    .header2TextItemFlexWrap {
        color: darkslategrey;
        border-radius: 20px;
        width: 235px;
        /*flex: 0 0 32%;*/
        line-height: 40px;
        font-size: 30px;
        margin-left: 6px;
        text-align: center;
        margin-bottom: 20px;
        background-color: #dddddd;
    }
    .header2TextTitle {
        color: blueviolet;
        font-size: 40px;
        font-weight: bold;
        margin-left: 12px;
    }

    .header2TextItem {
        color: darkslategrey;
        border-radius: 20px;
        font-size: 30px;
        margin-left: 6px;
        padding-left: 105px;
        height: 40px;
        flex: 1;
    }

    .header2TextItemColor {
        background-color: #dddddd;
    }

    .banner {
        height: 377px;
        flex-direction: row;
        background-color: lightgray;
    }

    .bannerInfo {
        width: 270px;
        align-items: center;
        justify-content: center;
    }

    .avatar {
        width: 108px;
        height: 108px;
        border-radius: 54px;
        border-width: 2px;
        border-color: #FFFFFF;
        margin-bottom: 14px;
    }

    .name {
        font-weight: bold;
        font-size: 32px;
        color: #ffffff;
        line-height: 32px;
        text-align: center;
        margin-bottom: 16px;
    }

    .titleWrap {
        width: 100px;
        height: 24px;
        margin-bottom: 10px;
        background-color: rgba(255, 255, 255, 0.80);
        border-radius: 12px;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 20px;
        color: #000000;
    }

    .bannerPhotoWrap {
        /*布局的方法是将整个内部空间的宽高+padding宽高 才是最终的宽高*/
        width: 447px;
        /*137*2 + 12*2 + 6*/
        height: 304px;
        background-color: #FFFFFF;
        border-radius: 12px;
        margin-top: 35px;
        padding: 12px;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .bannerPhoto {
        width: 137px;
        height: 137px;
        margin-bottom: 6px;
    }

    .refresh {
        width: 750px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .refreshText {
        color: #888888;
        font-weight: bold;
    }

    .indicator {
        color: #888888;
        height: 40px;
        width: 40px;
        margin-right: 30px;
    }

    .list {
        width: 750px;
    }

    .single-txt {
        height: 300px;
        line-height: 300px;
        text-align: center;
        font-size: 50px;
        color: #ff27a4;
        border: 2px dotted blueviolet;
        border-radius: 20px;
        margin: 12px;
        background-color: #00B4FF;
    }

    .cell {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .itemName {
        font-size: 28px;
        color:#333333;
        line-height: 42px;
        text-align:center;
        margin-top: 24px;
    }
    .itemPhoto {
        width: 220px;
        height: 220px;
        margin-top: 18px;
        margin-bottom: 18px;
    }
    .itemDesc {
        font-size: 24px;
        margin: 12px;
        color: darkorchid;
        line-height: 36px;
        text-align: center;
    }
    .itemClickBehaviour {
        font-size: 36px;
        color: coral;
        text-align:center;
        margin-bottom: 30px;
    }
</style>