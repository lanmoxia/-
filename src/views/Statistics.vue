<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <template v-if="groupedList.length > 0">
      <Chart :options="echartsOptions"/>
      <ol>
        <!-- group 一组 === array-->
        <!-- 数组没有 key 只能用 index 代替 key-->
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
          <ol class="recordWrapper">
            <li v-for="item in group.items" :key="item.id"
                class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
        </li>
      </ol>
    </template>
    <div v-else class="noResult">
      这里空空如也，快来记一笔吧 ~
    </div>
  </Layout>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constant/recordTypeList';
import dayjs from 'dayjs'
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';

@Component({
  components: {Tabs, Chart}
})
export default class Statistics extends Vue{
  type = '-';
  recordTypeList = recordTypeList;
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }
  get echartsOptions(){
    return{
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
  }
  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get groupedList() {
    const {recordList} = this
    // 使用 sort 来排序 需要给它两个值 一个表达式 `> = <` 三种可能
    // 由于 sort 改变原数组 这里我们只能clone clone的返回值可以通过 recordList 来推断出来 sort 每一项 TS 也能推出来
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
    // sort 会改变数组长度 长度为 0 就有第 [0] 项了 所以这里要判断 newList 长度
    if(newList.length === 0){return []}
    type Result = {title: string, total?: number, items: RecordItem[]}[]
    // 不为空就把第一项放到 result 由于排序是大到小 这里第 0 项就是当前的日期
    // result 结构：[{title: 日期}， {items: 第 0 项}]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}]
    for(let i=1; i<newList.length; i++){
      const current = newList[i]
      const last = result[result.length -1]
      // 如果是同一天
      if(dayjs(last.title).isSame(dayjs(current.createdAt), 'day')){
        last.items.push(current) // 把当前项放进去
      }else{ // 如果不相等 重开来一个桶把当前项放入
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]})
      }
    }
    // 统计
    result.map(group =>{ // 这里 map 和 forEtch 都可以（区别前者有返回值 后者没有返回值）
      group.total = group.items.reduce((sum,item) => sum + item.amount, 0)
    })
    //console.log(result); // 查看排序后的分组
    return result;
  }
  beforeCreated(){// 这里要使用 before 不然 hashTable 会出现空数组的问题
    this.$store.commit('fetchRecords')
  }
  beautify(string: string){
    const day = dayjs(string)
    const now = dayjs()
    if(day.isSame(now, 'day')){
      return '今天'
    }else if(day.isSame(now.subtract(1,'day'), 'day')){
      return '昨天'
    }else if(day.isSame(now.subtract(2,'day'), 'day')){
      return '前天'
    }else if(day.isSame(now, 'year')){
      return day.format('M月D日')
    }else{
      return day.format('YYY年M月D日')
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
}
.noResult{
  padding: 16px;
  text-align: center;
  color: #999;
}
/* deep 语法 两个 deep 可以合并 */
::v-deep {
  .type-tabs-item {
    background: #C4C4C4;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>