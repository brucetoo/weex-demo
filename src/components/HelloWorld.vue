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
      methods: {
        doSomething: function () {
          console.log('do something...')
        }
      }
    }
</script>

<style scoped>

</style>
