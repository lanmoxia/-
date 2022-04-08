<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <ol>
        <!-- group 一组 === array-->
        <!-- 数组没有 key 只能用 index 代替 key-->
        <li v-for="(group,index) in result" :key="index">
          <h3>{{group.title}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{item.amount}} {{item.createdAt}}
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
@Component({
  components: {Tabs}
})
export default class Statistics extends Vue{
  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get result() {
    const {recordList} = this
    type HashTableValue = {title:string,items: RecordList[]}
    // 如何生成一个空的对象的类型
    const hashTable: {[key: string]: HashTableValue} = {} // hashTable 的 key 是字符串 类型是 RecordItem 扩展的类型
    console.log(hashTable);
    for (let i = 0; i < this.recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T')
      hashTable[date] = hashTable[date] || {title:date, items: []}
      hashTable[date].items.push(recordList[i])
    }
    return hashTable
  }
  beforeCreate(){// 这里要使用 before 不然 hashTable 会出现空数组的问题
    this.$store.commit('fetchRecords')
  }
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
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
  .interval-tabs-item{
    height: 48px;
  }
}
</style>