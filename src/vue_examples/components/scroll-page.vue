<template>
    <div class="wrapper">
        <div class="top-tabs">
            <div class="tab" v-for="item in tabs">
                <image class="tab-icon" :src="item.icon" resize="cover"></image>
                <text class="tab-name">{{item.title}}</text>
            </div>
            <div class="indicator-parent" :style="indicatorStyle">
                <div class="indicator" ></div>
            </div>
        </div>
        <slider class="banner"
                @scroll="onScroll"
                @change="onChange"
                auto-play="false"
                offset-x-accuracy="0.001">
            <div v-for="image in imageList" class="image-container">
                <!--width的宽度计算是 750 - paddingLeft - paddingRight 保证居中
                paddingRight可以不设置，默认会将剩余的空间留给👉因为是左 -> 右布局-->
                <image style="width: 730px; height: 600px" :src="image.src" resize="cover"></image>
            </div>
        </slider>

        <div style="width: 750px;height: 100px; background-color: cornsilk; flex-direction: row">
            <!--absolute相对于第一个父布局中的位置 left,right,top,bottom 表示到对应此方向的距离-->
            <div style="width: 50px;height: 50px; background-color: cornflowerblue; position: absolute;left: 0;bottom: 10px;"></div>
            <!--relative相对于view自身的位置-->
            <div style="width: 50px;height: 50px; background-color: coral; position: relative; left: 10px;top: 10px;"></div>
            <div style="width: 50px;height: 50px; background-color: chartreuse"></div>
        </div>
    </div>
</template>

<script>
  var offset = 0;
  var currentIndex = 0;
  export default {
    name: "scroll-page",
    data: function () {
      return {
        indicatorStyle: {
          transform: ''
        },
        tabs: [
          {title: '首页', icon: 'https://gw.alicdn.com/tfs/TB19YESOVXXXXaNaXXXXXXXXXXX-45-45.png'},
          {title: '耍帅', icon: 'https://gw.alicdn.com/tfs/TB1I2E9OVXXXXbFXVXXXXXXXXXX-45-45.png'},
          {title: '旅行', icon: 'https://gw.alicdn.com/tfs/TB1gUhyPXXXXXX5XXXXXXXXXXXX-45-45.png'},
          {title: '潮玩', icon: 'https://img.alicdn.com/tfs/TB1D4RzQFXXXXcoXpXXXXXXXXXX-45-45.png'},
          {title: '穿搭', icon: 'https://gw.alicdn.com/tfs/TB1N1.6OVXXXXXqaXXXXXXXXXXX-45-45.png'},
        ],
        imageList: [
          {src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          {src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          {src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'},
          {src: 'https://img.alicdn.com/tfscom/i1/0/TB28OZ9oZnI8KJjSsziXXb8QpXa_!!3470683347-0-dgshop.jpg'},
          {src: 'https://img.alicdn.com/tfscom/i1/0/TB2xKpjpf6H8KJjSspmXXb2WXXa_!!3138112227-0-dgshop.jpg'},
        ]
      }
    },
    methods: {
      onScroll: function (e) {
        offset = e.offsetXRatio;
        var translateX = 150 * currentIndex - offset * 150;
        console.log(`onScroll ${translateX}`);
        this.indicatorStyle.transform = "translateX(" + translateX +"px)";
      },
      onChange: function (e) {
        currentIndex = e.index;
        console.log("onChange " + currentIndex);
      }
    }
  }
</script>

<style scoped>
    .wrapper {
        width: 750px;
        height: 900px;
    }

    .top-tabs {
        height: 140px;
        width: 750px;
        flex-direction: row;
        background-color: red;
    }

    .tab {
        width: 150px;
        height: 130px;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
    }

    .tab-icon {
        width: 45px;
        height: 45px;
    }

    .tab-name {
        font-size: 28px;
        color: #FFF;
        margin-top: 10px;
    }

    .indicator-parent {
        width:750px;
        height: 10px;
        transition-property: transform;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .indicator {
        width: 150px;
        height: 10px;
        background-color: cornflowerblue;
        border-radius: 2px;
    }

    .banner {
        width: 750px;
        height: 600px;
    }

    .image-container {
        padding-left: 10px;
        padding-top: 10px;
        padding-right: 10px;
        justify-content: center;
    }

</style>