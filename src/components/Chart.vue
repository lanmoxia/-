<template>
  <div class="wrapper" ref="wrapper"></div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import * as echarts from 'echarts'
import {EChartsOption} from 'echarts';
  @Component
  export default class Chart extends Vue{
    @Prop() options?: EChartsOption
    mounted(){
      if(this.options === undefined){
        return console.error('options 为空')
      }
      const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
      chart.setOption(this.options!)
    }
  }
</script>
<style lang="scss">
  .wrapper{
    min-height: 400px;
    padding-top: 6px;
  }
</style>