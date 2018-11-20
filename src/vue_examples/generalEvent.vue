<template>
    <scroller show-scrollbar="false" loadmoreoffset="50" @loadmore="onloadmore">
        <text id="text1" class='txt'
              @click="onclick"
              @longpress="onlongpress"
              @appear="onappear"
              @disappear="ondisappear">{{content}}
        </text>

        <!--
        通用事件中一般event都默认有三个属性
        1、type: 事件名字，如 click
        2、target : 触发事件的组件对象
        3、timestamp : 事件被触发时的时间戳
        4、direction : 触发事件时屏幕的滚动方向，up 或 down -- 在appear和disappear放在可滚动的容器中才有
        <input> 和 <switch> 组件目前不支持 click，longpress 事件，用 change 或 input 事件来代替。
        -->
        <image id="img" class="img"
               resize="stretch"
               src="https://gw.alicdn.com/tfs/TB1dZ4WowoQMeJjy0FnXXb8gFXa-950-1267.jpg"></image>

        <slider class="slider" interval="2000" @change="onchange" auto-play="true">
            <div class="slide-parent" v-for="img in imageList">
                <!--
                src之前有冒号(vue扩展的属性),表示事件可以动态值,
                src如果没冒号,表示静态值,(html原生的值)
                -->
                <image class="img" :src="img.src" resize="cover"></image>
            </div>
            <indicator class="indicator"></indicator>
        </slider>
        <text id="text2" class='txt' @appear="onappear" @disappear="ondisappear"> {{"text-2"}}</text>
        <text id="text3" class='txt' @appear="onappear" @disappear="ondisappear"> {{"text-3"}}</text>
        <text id="text4" class='txt' @appear="onappear" @disappear="ondisappear"> {{"text-4"}}</text>
        <text id="text5" class='txt' @appear="onappear" @disappear="ondisappear"> {{"text-5"}}</text>
        <text id="text6" ref='text6' class='txt' @appear="onappear" @disappear="ondisappear"> {{"text-6"}}</text>
    </scroller>
</template>

<script>
  const native = weex.requireModule('WeexModule');
  const modal = weex.requireModule('modal');
  const dom = weex.requireModule('dom');
  export default {
    data() {
      return {
        content: "text-1",
        imageList: [
          {title: 'item A', src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          {title: 'item B', src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          {title: 'item C', src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
        ]
      };
    },
    methods: {
      onloadmore(e) {
        modal.toast({
          message: "load more trigger",
          duration: 2
        })
      },
      onclick(e) {
        this.content = "onclick-> type:" + e.type + " target:" + e.target
        dom.scrollToElement(this.$refs.text6,{
          offset: -400,
          animated: true
        })
      },
      onlongpress(e) {
        this.content = 'onlongpress-> type:' + e.type
      },
      onappear(e) {
        if (e.target.id === 'text1') {
          this.content = e.target.id
        }
        native.logger("appear -> direction:" + e.direction)
        // this.content = 'onappear-> type:' + e.target.id
      },
      ondisappear(e) {
        native.logger("disappear -> direction:" + e.direction);
        if (e.target.id === 'text1') {
          this.content = e.target.id
        }
      },
    }
  };
</script>

<style scoped>
    .txt {
        text-align: center;
        line-height: 300px;
        height: 300px;
        font-size: 60px;
        color: red;
        border-radius: 20px;
        border-color: blue;
        border-style: dotted;
        border-width: 2px;
        margin: 12px;
        background-color: aqua;
    }

    .img {
        height: 300px;
        width: 300px;
        /*如果有设置宽高度,但是view自己宽高未铺满父布局,则可以通过align-self来指定位置*/
        align-self: center;
    }

    .slider {
        margin: 12px;
        height: 300px;
        align-self: center;
        border-style: solid;
        border-width: 3px;
        border-color: chocolate;
    }

    .slide-parent {
        height: 300px;
        width: 700px;
    }
    .indicator {
        width: 100px;
        height: 80px;
        align-self: center;
        item-color: green;
        item-selected-color: red;
        item-size: 20px;
        position: absolute;
        right: 20px;
        bottom: 0px;
    }
</style>



