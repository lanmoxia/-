<template>
  <div class="wrapper" ref="wrapper"></div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts'
import {EChartsOption} from 'echarts';
  @Component
  export default class Chart extends Vue{
    @Prop() options?: EChartsOption
    chart?: Echarts
    mounted(){
      console.log('mounted');
      if(this.options === undefined){
        return console.error('options 为空')
      }
      this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
    }
    // 使用 immediate 第一次也渲染 可代替 mounted
    // 由于是先传参在执行 mounted 这里 this.chart! 是 undefined 所以不能使用 immediate
    @Watch('options', {immediate: true})
    onOptionsChange(newValue: EChartOption){
      console.log('options 变化了');
      this.chart!.setOption(newValue)
    }
  }
</script>
<style lang="scss">
  .wrapper{
    min-height: 400px;
    padding-top: 6px;
  }
</style>