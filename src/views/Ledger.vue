<template>
  <div>
    <Layout class-prefix="layout" >
      {{record}}
      <NumberPad @update:value="onUpdateAmount"/>
      <Types :type="record.type" @update:value="onUpdateType"/>
      <Notes @update:value="onUpdateNotes"/>
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
import {Component} from 'vue-property-decorator';

// 确定好组件的参数、更新回调的名称
// 使用组件的时候，传的参数和填写的回调名，是不是一致
// 子组件内部怎么实现，和父组件调用它时传了什么参数这种不影响的内容都要剥离开

// 把收集的数据放到一个对象里 由于是 TS 不能只说是一个对象 在这里声明下类型
type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
}
@Component({components: {Tags, Notes, Types, NumberPad}})
export default class Ledger extends Vue{
  tags = ['衣', '食', '住', '行', '股票'];
  record: Record = {tags:[], notes:'', type:'-', amount: 0}
  onUpdateTags(value:string[]){this.record.tags = value}
  onUpdateNotes(value:string){this.record.notes = value}
  onUpdateType(value:string){this.record.type = value}
  onUpdateAmount(value:string){this.record.amount = parseFloat(value)} // 这里是 number 需要转换下
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>