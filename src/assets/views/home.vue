<template>
    <div class="wrapper">
        <home-header></home-header>
        <top-channel :selectedIndex="selectedIndex" @changeTab="onChangeTab" @tabChannels="initChannels"></top-channel>
        <slider class="main_container" auto-play="false" @change="onPageChange" :index="selectedIndex">
            <div class="container" v-for="(name,index) in channels">
                <text style="color: #0088fb;font-size: 55px" v-if="index !== 0">{{name}}</text>
                <!--TODO re-generated index item-->
                <scroller v-if="index === 0" offset-accuracy="300"
                          loadmoreoffset="300" @loadmore="onloadmore">
                    <refresher @loadingDown="loadingDown"></refresher>
                    <div class="cell-button" @click="jumpWeb('https://m.you.163.com/act/pub/DxDpYNfbBd.html')">
                        <yx-slider :imageList="YXBanners"></yx-slider>
                        <div class="slogan">
                            <text class="confont-two" style="font-size: 20wx;color: coral;padding-top: 14px">&#xe60b;</text>
                            <text class="confont-two" style="font-size: 20wx;color: cornflowerblue;padding-top: 14px">&#xe60a;</text>
                            <text class="confont-two" style="font-size: 20wx;color: lightcoral;padding-top: 14px">&#xe609;</text>
                            <text class="i-slg customFont" style="font-size: 40px">网易自营品牌</text>
                            <text class="i-slg iconfont" style="font-size: 40px">网易自营品牌</text>
                            <text class="i-slg iconfont">&#xe609; 48小时退款</text>
                        </div>
                    </div>
                    <div class="cell-button">
                        <block-1 :title="makers.title" :items="makers.items"></block-1>
                    </div>
                    <div class="cell-button">
                        <block-2 hasMore=true newGoods=true :head="recommend.head1"
                                 :goods="recommend.goods1"></block-2>
                    </div>
                    <div class="cell-button">
                        <block-2 hasMore=true hotGoods=true :head="recommend.head2"
                                 :goods="recommend.goods2"></block-2>
                    </div>
                    <div class="cell-button">
                        <block-3 :goods="goodsList"></block-3>
                    </div>
                    <loading class="loading" @loading="onloading" :display="showLoading">
                        <text class="indicator">...</text>
                    </loading>
                </scroller>

                <list v-if="index === 1">
                    <cell v-for="index in 50">
                        <div style="width: 750px;height: 100px; background-color: cornflowerblue; padding-top: 20px">
                            <text>{{index}}</text>
                        </div>
                    </cell>
                </list>

                <!--<scroller v-if="index === 2">-->
                   <!--<richText :style='style_richText' @measure="measure" :text="formatHtml" textSize="20"></richText>-->
                   <!--<web style="width: 750px;height: 300px" :source="formatHtml"></web>-->
                   <!--<rich-text text="'<p>牧师 | 标准模式 | 7700尘</p>"></rich-text>-->
                <!--</scroller>-->
                    <html-text style="background-color: white;padding: 20px"
                               v-if="index === 2"
                               class="main-list"
                               :html-text="formatHtml"
                               :html-option="htmlOption"
                    >
                    </html-text>
            </div>
        </slider>
    </div>
</template>
<style scoped>

    .iconfont {
        font-family: iconfont;
    }
    .confont-two {
        font-family: iconfont-two;
    }

    .customFont {
        font-family: font-bold;
    }

    .wrapper {
    }

    .main-list {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        /*margin-top: 167px;*/
        /*margin-bottom: 90px;*/
    }

    .ml-ipx {
        top: 208px;
        bottom: 140px;
    }

    .cell-button {
        padding-bottom: 18px;
    }

    .slogan {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #fff;
    }

    .i-slg {
        height: 66px;
        font-size: 26px;
        padding-top: 16px;
        flex: 1;
        text-align: center;
        color: #b4282d;
    }

    .main_container {
        position: absolute;
        /* header=84px channel=54px */
        top: 138px;
        bottom: 90px;
        left: 0;
        right: 0;
    }

    .container {
        width: 750px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        align-items: center;
        justify-content: center;
    }
</style>

<script>
  var modal = weex.requireModule('modal')
  var navigator = weex.requireModule('navigator')
  import util from '../util';
  import Header from '../components/Header.vue';
  import refresher from '../components/refresh.vue';
  import topChannel from '../components/topChannel.vue';
  import YXSlider from '../components/YXSlider.vue';
  import Block1 from '../components/Block1.vue';
  import Block2 from '../components/Block2.vue';
  import Block3 from '../components/Block3.vue';

  export default {
    components: {
      'home-header': Header,
      'refresher': refresher,
      'top-channel': topChannel,
      'yx-slider': YXSlider,
      'block-1': Block1,
      'block-2': Block2,
      'block-3': Block3
    },
    data() {
      return {
        selectedIndex: 0,
        channels: [],
        YXBanners: [],
        makers: {
          title: '品牌SS制造商直供',
          items: []
        },
        recommend: {
          head1: {
            tlt: '周一周四 · 新品发布',
            tltBg: 'http://doc.zwwill.com/yanxuan/imgs/bg-new.png',
            url: 'http://m.you.163.com/item/newItem'
          },
          goods1: [],
          head2: {
            tlt: '人气推荐 · 好物精选',
            tltBg: 'http://doc.zwwill.com/yanxuan/imgs/bg-hot.png',
            url: 'http://m.you.163.com/item/recommend'
          },
          goods2: []
        },
        goodsList: [],
        showLoading: 'hide',
        htmlOption: {
          image: {
            resize: 'cover'
          },
          table: {
            template: ''
          },
          tags:['img','table','video']
        },
        formatHtml: '<h1>Header 1</h1>\n' +
        '<h2><span>Header 2</span></h2>\n' +
        '<h6><span>Header 6</span></h6>\n' +
        '<blockquote>\n' +
        '    <p>这是引用块</p>\n' +
        '</blockquote>\n' +
        '<p><strong>这是粗体</strong></p>\n' +
        '<p><i>这是斜体</i></p>\n' +
        '<p><img width="1438" height="612" src="http://android-imgs.25pp.com/fs08/2019/01/15/0/f02270fde4c161b3c97846386fca987a.png" slate-data-type="image" /></p>\n' +
        '<p><u>这是下划线</u></p>\n' +
        '<p><s>这是删除线</s></p>\n' +
        '<p><span style="color:rgba(233,61,13,255)"><span>字体颜色</span></span></p>\n' +
        '<p><span style="background-color:rgba(238,209,8,255)"><span>字体背景</span></span></p>\n' +
        '<p><img width="1238" height="574" src="http://android-imgs.25pp.com/fs08/2019/01/15/11/183446ed0255a1c90694f6e927fda491.png" slate-data-type="image" /></p>\n' +
        '<p><span><s><u><i><strong><span style="font-size:16px">各个复杂的属性集成</span></strong></i></u></s></span></p>\n' +
        '<table>\n' +
        '    <colgroup>\n' +
        '        <col width="20.52%" />\n' +
        '        <col width="29.48%" />\n' +
        '        <col width="25%" />\n' +
        '        <col width="25%" />\n' +
        '    </colgroup>\n' +
        '    <tbody>\n' +
        '        <tr>\n' +
        '            <td>\n' +
        '                <p>第一个表格</p>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <p><span>第一个表格</span></p>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <p><span>第一个表格</span></p>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <p><img width="368" height="54" src="http://android-imgs.25pp.com/fs08/2019/01/15/2/05cd29a31a3a1fb28345a1853b956a2f.png" slate-data-type="image" /></p>\n' +
        '            </td>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <td>\n' +
        '                <p><span>第一个表格</span></p>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <p><img width="193" height="27" src="http://android-imgs.25pp.com/fs08/2019/01/15/10/9d59a1e74b3cc7ee12b1b8ef8cf13525.png" slate-data-type="image" /></p>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <p><span>第一个表格</span></p>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <p>这里是文章</p>\n' +
        '            </td>\n' +
        '        </tr>\n' +
        '    </tbody>\n' +
        '</table>\n' +
        '<p><video style="width:100%;height:auto" src="http://video.pp.cn/fs08/2019/01/04/5/0_80dea3fc58b450d95190f23a34bdee68.mp4" controls="" poster="https://android-imgs.25pp.com/fs08/2019/01/04/8/1_96b37b8f82c56a92a1af3df4da1f3af6.jpg"></video></p>\n' +
        '<p></p>\n' +
        '<table>\n' +
        '    <tbody>\n' +
        '        <tr>\n' +
        '            <td>\n' +
        '                <p>又是一个table</p>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <p><span>又是一个table</span></p>\n' +
        '            </td>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <td>\n' +
        '                <p><span>又是一个table</span></p>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <p><span>又是一个table</span></p>\n' +
        '            </td>\n' +
        '        </tr>\n' +
        '    </tbody>\n' +
        '</table>\n' +
        '<p></p>\n',
        subViews: [{
          type: 1,
          html: ''
        }],
        style_richText: {
          height: 1500,
          width: 'auto'
        }
      }
    },
    created() {
      this.GET('api/home/index', res => {
        let result = res.data.result;
        this.YXBanners = result['banners'];
        this.makers = result['makers'];
        this.recommend = result['recommend'];
      });
      this.GET('api/home/pullGoods', res => {
        let result = res.data.result;
        this.goodsList = result['goods'];
      });
      this.generateSubViews();
    },
    methods: {
      measure(e) {
        this.style_richText.height = e.height
      },
      generateSubViews() {
        this.formatHtml.search('<table>')
      },
      jumpWeb(_url) {
        const url = this.$getConfig().bundleUrl;
        navigator.push({
          url: util.setBundleUrl(url, 'page/webview.js?weburl=' + _url),
          animated: "true"
        });
      },
      onloading() {
        modal.toast({message: 'loading', duration: 0.3})
        this.showLoading = 'show';
        setTimeout(() => {
          this.goodsList.push(...this.recommend.goods1);
          this.showLoading = 'hide'
        }, 300)
      },
      onloadmore() {
        modal.toast({message: 'loading', duration: 0.3})
        setTimeout(() => {
          this.goodsList.push(...this.recommend.goods1);
        }, 100)
      },
      loadingDown() {
        this.goodsList = [];
        this.goodsList.push(...this.recommend.goods2);
        this.goodsList.push(...this.recommend.goods1);
      },
      onChangeTab(_result) {
        this.Toast('select:' + _result.index);
        this.onPageChange(_result)
      },
      initChannels(_result) {
        this.channels.push(..._result.channels)
      },
      onPageChange(_event){
        this.selectedIndex = _event.index;
        this.sendEvent('scrollToTab',{
          index: _event.index
        })
      },
    }
  }
</script>