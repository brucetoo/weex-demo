<template>
    <!--pagingEnabled="true" pageSize="400"-->
    <waterfall class="list" :show_scrollbar="showScrollbar" :column-count="columnCount" :column-gap="columnGap"
               :column-width="columnWidth">
        <refresh class="refresh" :style="{height:refreshViewHeight}" @refresh="onrefresh" @pullingdown="onpullingdown"
                 :display="refreshing ? 'show' : 'hide'">
            <loading-indicator class="indicator" color="blue"></loading-indicator>
            <text class="refreshText">{{refreshText}}</text>
        </refresh>

        <!--<cell v-for="item in listItems">-->
        <!--<text class="single-txt" @click="onclick">{{"index:" + item}}</text>-->
        <!--</cell>-->

        <header style="position: relative;padding-bottom: 18px;" :ref="header" v-if="showHeader">
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

        <cell v-for="item in listItems">
            <text class="single-txt" @click="onclick">{{"index:" + item}}</text>
        </cell>
    </waterfall>
</template>

<script>
  export default {
    name: "allcomponents",
    data() {
      return {
        showScrollbar: true,
        columnCount: 2,
        columnGap: 12,
        columnWidth: 'auto',
        refreshing: false,
        refreshViewHeight: 128,
        refreshText: '↓   pull to refresh...',
        showHeader: true,
        listItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        needBgColor: false,
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
      }
    },
    methods: {

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
      }
    }
  }
</script>

<style scoped>

    .headerFlexWrap {
        padding-top: 20px;
        background-color: cornsilk;
        margin-left: 12px;
        margin-right: 12px;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .header2TextItemFlexWrap {
        color: darkslategrey;
        border-radius: 20px;
        width: 235px;
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
</style>