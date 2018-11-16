<template>
    <div style="flex-direction:row">
        <text test-id="content" class='btn' v-if="show">{{content}}</text>
        <text test-id="button" class="btn" @click="handleOnclick">{{btnTitle}}</text>
    </div>
</template>

<script>
  const nativeModule = weex.requireModule('WeexModule');
  module.exports = {
    data() {
      return {
        content: "I received event",
        show: false,
        btnTitle: "click me to fire globalEvent"
      }
    },
    mounted() {
      var self = this;
      weex.requireModule("globalEvent").addEventListener("showText", function (e) {
        nativeModule.logger("globalEvent --> " + e.eventParam)
        self.show = true;
      });
      nativeModule.logger("mounted ------->>>> ")
      nativeModule.addEventListener("WeexModule",function (e) {//JSON.stringify(e) 可以将传的参数解析成string
        nativeModule.logger("singleEvent --> " + e.data.param1)
      })
    },
    methods: {
      handleOnclick: function (e) {
        var self = this;
        weex.requireModule('modal').toast({
          'message': "oh my god!",
          'duration': 2
        })
        // weex.requireModule('WeexModule').fireNativeGlobalEvent("showText", function (e) {
        //   if (Boolean(e.ok)) {
        //     self.btnTitle = "posted"
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
    .btn {
        margin-top: 100px;
        margin-left: 100px;
        border-width: 3px;
        height: 50px;
        border-color: red;
        border-radius: 10px;
        background-color: rgba(23, 145, 245, 1)
    }
</style>