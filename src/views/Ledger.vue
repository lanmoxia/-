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