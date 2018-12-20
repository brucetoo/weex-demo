<template>
    <div :class="['wrapper', isIpx&&isIpx()?'w-ipx':'']">
        <scroller class="scroller"
                  scroll-direction="horizontal"
                  show-scrollbar=false>
            <!--<div class="j-uline" :style="jLPosition" ref="jcLine"></div>-->
            <div v-for="(name,index) in channels" ref="item">
                <div class="channel-item">
                    <text :class="['i-c', selectedIndex === index ? 'c-act' : '']"
                          @click="selectChannel(index)">{{name}}
                    </text>
                    <div class="j-uline" v-if="selectedIndex === index"></div>
                </div>
            </div>
        </scroller>
        <text class="more iconfont" @click="extend">&#xe661;</text>
    </div>
</template>
<style scoped>

    .iconfont {
        font-family: iconfont;
    }

    .wrapper {
        position: absolute;
        top: 84px;
        left: 0;
        right: 0;
        height: 54px;
        z-index: 10;
        background-color: #fafafa;
        border-bottom-width: 1px;
        border-bottom-color: #d9d9d9;
    }

    .w-ipx {
        top: 154px;
    }

    .scroller {
        height: 60px;
        flex-direction: row;
    }

    .i-c {
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 26px;
        color: #333;
    }

    .c-act {
        color: #b4282d;
    }

    .j-uline {
        position: relative;
        bottom: 0;
        width: 60px;
        height: 4px;
        margin-top: 5px;
        background-color: #b4282d;
    }

    .more {
        position: absolute;
        top: 0;
        right: 0;
        height: 52px;
        width: 100px;
        background-color: #fafafa;
        text-align: center;
        padding-top: 10px;
        opacity: 0.96;
        /*box-shadow: -6px -4px 4px #fafafa;*/
    }

    .channel-item {
        flex-direction: column;
        margin-left: 30px;
        align-items: center;
        justify-content: center
    }
</style>
<script>
  const dom = weex.requireModule('dom');
  const animation = weex.requireModule('animation');
  export default {
    props:['selectedIndex'],
    data() {
      return {
        channels: ['限时购', '新品', '居家', '餐厨', '配件', '服装', '电器', '洗护', '杂货', '饮食', '婴童', '志趣'],
        jLPosition: {left: '30px', width: '100px'}
      }
    },
    mounted() {
      let self = this;
      this.$emit('tabChannels',{
        channels: self.channels
      })
    },
    created() {
      this.handleEvent('scrollToTab',(_result) => {
        dom.scrollToElement(this.$refs.item[_result.index], {})
      })
    },
    methods: {
      selectChannel(index) {
        //1、scroll to selected item
        dom.scrollToElement(this.$refs.item[index], {})
        //2、move indicator 30 + (90 + 60) * index
        // this.jLPosition = {
        //   left: 30 + (90 + 60) * index + 'px',
        //   width: '100px'
        // };
        //3、send change page event
        this.$emit('changeTab',{
          index: index
        })
      },
      extend(e){
        this.Toast('open tab channel');
      }
    }
  }
</script>


