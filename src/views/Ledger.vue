<template>
  <div>
    <Layout class-prefix="layout" >
      <!-- 定义 submit 事件，点击 OK 就保存 -->
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
      <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
      <div class="createdAt">
        <FormItem filter-name="日期"
                  type="date"
                  placeholder="请选择日期"
                  :value.sync="record.createdAt"/>
      </div>
      <div class="notes">
        <FormItem filter-name="备注"
                  placeholder="请在这里输入"
                  :value.sync="record.notes"/>
      </div>
      <Tags @update:value="record.tags = $event"/>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Ledger/NumberPad.vue';
import FormItem from '@/components/Ledger/FormItem.vue';
import Tags from '@/components/Ledger/Tags.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constant/recordTypeList';
import Tabs from '@/components/Tabs.vue';

@Component({components: {Tabs, Tags, FormItem, NumberPad}})
export default class Ledger extends Vue{
  get recordList(){
    return this.$store.state.recordList
  }
  recordTypeList = recordTypeList
  record: RecordItem = {
    tags:[], notes:'', type:'-', amount: 0, createdAt: new Date().toISOString()
  }
  created(){
    this.$store.commit('fetchRecords')
  }
  saveRecord(){
    if(!this.record.tags || this.record.tags.length === 0){
      return window.alert('请选择至少标签')
    }
    this.$store.commit('createRecord',this.record)
    window.alert('已保存')
    this.record.notes = ''
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>