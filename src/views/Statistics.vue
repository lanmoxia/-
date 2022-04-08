<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <ol>
        <!-- group 一组 === array-->
        <!-- 数组没有 key 只能用 index 代替 key-->
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{beautify(group.title)}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record"
            >
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
        </li>
      </ol>
  </Layout>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constant/intervalList';
import recordTypeList from '@/constant/recordTypeList';
import dayjs from 'dayjs'
import clone from '@/lib/clone';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue{
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }
  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get result() {
    const {recordList} = this
    type HashTableValue = { title: string, items: RecordItem[] }
    // 如何生成一个空的对象的类型
    //const hashTable: {key: string, items: RecordItem[]}[];// 对象遍历不一定按照顺序 所以它必须是一个数组
    //console.log(recordList.map(i => i.createdAt));
    // 使用 sort 来排序 需要给它两个值 一个表达式 `> = <` 三种可能
    // 由于 sort 改变原数组 这里我们只能clone clone的返回值可以通过 recordList 来推断出来 sort 每一项 TS 也能推出来
    const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
    //console.log(recordList.map(i => i.createdAt));
    return [];
  }
  beforeCreate(){// 这里要使用 before 不然 hashTable 会出现空数组的问题
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
/* deep 语法 两个 deep 可以合并 */
  ::v-deep {
    .type-tabs-item {
      background: white;
      &.selected {
        background: #C4C4C4;
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