<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag) >= 0}"
          @click="toggle(tag)">
        {{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component
export default class Tags extends Vue{
  @Prop() readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];
  toggle(tag:string){
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0){
      this.selectedTags.splice(index,1)
    }else{
      this.selectedTags.push(tag)
    }
    this.$emit('update:value',this.selectedTags)
  }
  createTag(){
    const name = window.prompt('请输入标签名')
    if(name){
        const message = tagListModel.create(name)
        if(message === 'duplicated'){
          window.alert('标签名重复了')
        }else if(message === 'success'){
          window.alert('添加成功')
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>