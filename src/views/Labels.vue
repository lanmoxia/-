<template>
<div>
  <Layout>
    <ol class="tags">
    <li v-for="tag in tags" :key="tag">
      <span>{{tag}}</span>
      <Icons name="right"/>
    </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';
tagListModel.fetch()
@Component
export default class Labels extends Vue{
  // 这里不用管数据层 非常简约
  tags = tagListModel.data
  createTag(){
    const name = window.prompt('请输入标签名')
    if(name){
        tagListModel.create(name)
      }
    }
}
</script>

<style lang="scss" scoped>
.tags{
  background-color: white;
  font-size: 16px;
  >li{
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e6e6e6;
    padding-left: 16px;
    svg{
      width:18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag{
  background-color: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper{
    text-align:center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>