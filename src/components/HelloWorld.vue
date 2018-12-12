<template>
    <div>
        <text class="message">Now, let's use Vue.js to build your Weex app.</text>
        <a v-bind:href="url"></a>
        <a :href="url"></a>//v-bind:href 简写
        <p v-if="seen">You have seen me</p>
        <a v-on:click="doSomething"></a>
        <a @click="doSomething"></a> //v-on:click 简写
    </div>
</template>

<script>/* eslint-disable indent */
  // const stream = weex.requireModule('stream')
  export default {
    data () {//组件中data必须是函数，其他地方可以是函数，比如入口函数中data: {key:,...}
      return {
        computedProperty: 1,
      }
    },
    computed: {
      //仅仅读取值，必须是函数 且有返回值
      plusOne: function () {
        return this.computedProperty + 1;
      },
      doubleProperty: {
        get: function () {
          return this.computedProperty * 2;
        },
        set: function (v) {//当调用 doubleProperty = 3 时设置属性值是调用
          this.computedProperty = v - 1;
        }
      }
    },
      methods: {
        doSomething: function () {
          this.plusOne(); // computedProperty = 2
          this.doubleProperty = 3; // computedProperty = 2
          this.doubleProperty(); //computedProperty = 4
          console.log('do something...')
        }
      }
    }
</script>

<style scoped>

</style>
