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

@Component({
  components: {Tags, FormItem, Types, NumberPad},
  // 1. 把 data 改为 computed
  computed: {
    recordList(){
      return this.$store.state.recordList
    }
  }
})
export default class Ledger extends Vue{
  record: RecordItem = {
    tags:[], notes:'', type:'-', amount: 0
  }
  created(){
    this.$store.commit('fetchRecords')
  }
  onUpdateNotes(value: string) {this.record.notes = value}
  saveRecord(){
    this.$store.commit('createRecord',this.record)
  }
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