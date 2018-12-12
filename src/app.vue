<template>
    <div id="app">
        <div class="box shadow" style="align-content: center; justify-items: center">
            <text> Router-View</text>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  export default {
    name: "app",
    data: function () {
      return {}
    },
  }
</script>

<style scoped>
    .box {
        width: 100px;
        height: 100px;
    }

    .shadow {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    .shadow:active {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .top-menu ul, .top-menu li {
        list-style: none;
    }

    .top-menu {
        overflow: hidden;
    }

    .top-menu li {
        float: left;
        width: 100px;
    }
</style>