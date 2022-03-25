<template>
  <div>
    <Layout class-prefix="layout" >
      {{record}}
      <NumberPad :value.sync="record.amount"/>
      <Types :value.sync="record.type"/>
      <Notes :value.sync="record.notes" @update:value="onUpdateNotes"/>
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
  onUpdateNotes(value:string){this.record.notes = value}
  onUpdateTags(value:string[]){this.record.tags = value}
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>