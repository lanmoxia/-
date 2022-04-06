<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="js">
  // 可以把监控 store 放到全局 store 变化就会通知 Vue
  import store from "@/store/index2"
  export default {
    data(){
      return{
        store: store
      }
    }
  }
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-family: $font-hei;
  background-color: #f5f5f5;
}
</style>
