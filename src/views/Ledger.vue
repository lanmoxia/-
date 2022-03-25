<template>
  <div>
    <Layout class-prefix="layout" >
      {{recordList}}
      <!-- 定义 submit 事件，点击 OK 就保存 -->
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <Notes :value.sync="record.notes"/>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
import NumberPad from '@/components/Ledger/NumberPad.vue';
import Types from '@/components/Ledger/Types.vue';
import Notes from '@/components/Ledger/Notes.vue';
import Tags from '@/components/Ledger/Tags.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

// 把收集的数据放到一个对象里 | 由于是 TS 不能只说是一个对象 在这里声明下类型
type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number // 数据类型：object | string
  createdAt?: Date// 类 / 构造函数 比类型小
}
@Component({components: {Tags, Notes, Types, NumberPad}})
export default class Ledger extends Vue{
  tags = ['衣', '食', '住', '行', '股票'];
  // 把 record 放到 recordList 中 | 在 localStorage 获取默认值 | localStorage 中只能存字符串
  recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')
  record: Record = {tags:[], notes:'', type:'-', amount: 0}
     // 数据库更新/数据迁移：
  // 比如用户使用的初级版本 后来的版本才有创建时间 不可能让用户自己删除数据 这就需要升级数据库
    // 升级数据库版本：
  // 比如用老用户是第0版 现在在第3版 可以从0-1 1-2 2-3 这样升级最好 即使到了10版 我们只需要从9-10即可
//   const version = window.localStorage.getItem('version')
//   if(version === 0.0.1){
//     recordList.$forEach(record => {
//       record.createdAt = new Date(year:2022, month:0, data:1)
// })
// window.localStorage.setItem('recordList', JSON.stringify(recordList))
//   }else if(version === 0.0.2){
//   // 迁移版本
// }
//   window.localStorage.setItem('recordList', JSON.stringify(recordList))}
  onUpdateTags(value:string[]){this.record.tags = value}
  saveRecord(){
    // 深拷贝
    const record2: Record = JSON.parse(JSON.stringify(this.record))
    // 生成日期
    record2.createdAt = new Date()
    // 不使用深拷贝 | 这里是引用的地址 每次数据更新了都会覆盖之前的
    this.recordList.push(record2)
    console.log(this.recordList);
  }
  @Watch('recordList')
  onRecordListChange() {
    // 存到 localStorage 中
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>