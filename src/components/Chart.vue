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
    // mounted 只在挂载时执行 后边切换支出收入不会更新
    // 这里使用 watch 监听更新
    mounted(){
      if(this.options === undefined){
        return console.error('options 为空')
      }
      this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
      this.chart.setOption(this.options)
    }

    @Watch('options')
    onOptionsChange(newValue: EChartOption){
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