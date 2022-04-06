<template>
  <div>
    <Layout class-prefix="layout" >
      <!-- 定义 submit 事件，点击 OK 就保存 -->
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <div class="notes">
        <FormItem filter-name="备注" placeholder="请在这里输入" @update:value="onUpdateNotes"/>
      </div>
      <Tags/>
      {{count}} <button @click="add">+1</button>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Ledger/NumberPad.vue';
import Types from '@/components/Ledger/Types.vue';
import FormItem from '@/components/Ledger/FormItem.vue';
import Tags from '@/components/Ledger/Tags.vue';
import {Component} from 'vue-property-decorator';

import store from '@/store/index2';

@Component({components: {Tags, FormItem, Types, NumberPad}})
export default class Ledger extends Vue{
  // 获取数据
  count= store.count // 只是把 0 复制到 count store.count 变化了并不影响左边 count 的值
  recordList = store.recordList // 无名对象的地址的复制到 recordList 对象更改 引用的同一个地址的 recordList 也会跟着变化
  record: RecordItem = {
    tags:[], notes:'', type:'-', amount: 0
  }
  // 点击按钮并没有反应 这是因为 count= store.count 是传的值
  add(){
    store.addCount()
  }
  onUpdateNotes(value: string) {this.record.notes = value}
  saveRecord(){store.createRecord(this.record)}
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding: 12px 0;
}
</style>