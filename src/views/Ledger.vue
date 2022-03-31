<template>
  <div>
    <Layout class-prefix="layout" >
      <!-- 定义 submit 事件，点击 OK 就保存 -->
      <NumberPad
          :value.sync="record.amount"
          @submit="saveRecord"
      />
      <Types :value.sync="record.type"
      />
      <FormItem
          filter-name="备注"
          placeholder="请在这里输入"
          @update:calue="onUpdateNotes"
      />
      <Tags
          :data-source.sync="tags"
          @update:value="onUpdateTags"
      />
    </Layout>
  </div>
</template>

<script lang="ts">
import NumberPad from '@/components/Ledger/NumberPad.vue';
import Types from '@/components/Ledger/Types.vue';
import FormItem from '@/components/Ledger/FormItem.vue';
import Tags from '@/components/Ledger/Tags.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {recordListModel} from '@/models/recordListModel';
import {RecordItem} from '@/custom';
import {tagListModel} from '@/models/tagListModel';
// 从 models 获取数据
const recordList = recordListModel.fetch()
// 暂时没用到 下边使用这个变量 ledger 和 labels 会不同步显示
//const tagList = tagListModel.fetch()
@Component({components: {Tags, FormItem, Types, NumberPad}})
export default class Ledger extends Vue{
  tags = tagListModel.fetch(); // 这里外部使用变量 tagList 创建标签后两个不同步显示 需要刷新
  // 获取数据
  recordList: RecordItem[] = recordList
  record: RecordItem = {tags:[], notes:'', type:'-', amount: 0}
  onUpdateTags(value:string[]){this.record.tags = value}
  onUpdateNotes(value: string) {this.record.notes = value}
  saveRecord(){
    // 深拷贝
    const record2: RecordItem = recordListModel.clone(this.record)
    // 生成日期
    record2.createdAt = new Date()
    // 不使用深拷贝 | 这里是引用的地址 每次数据更新了都会覆盖之前的
    recordList.push(record2)
  }
  @Watch('recordList')
  onRecordListChange() {
    // 存到 localStorage 中
    recordListModel.save(this.recordList)
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>