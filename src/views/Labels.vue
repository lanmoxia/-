<template>
<div>
  <Layout>
    <div class="tags">
    <router-link class="tag"
        v-for="tag in tags" :key="tag.id"
        :to="`/labels/edit/${tag.id}`">
      <span>{{tag.name}}</span>
      <Icons name="right"/>
    </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
<!--      这里可以使用 .native 大 Button 组件就不用传递 @click 了-->
<!--      <Button class="createTag" @click.native="createTag">新建标签</Button>-->
    </div>
  </Layout>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Labels extends Vue{
  // 这里不用管数据层 非常简约
  tags = window.tagList
  createTag(){
    const name = window.prompt('请输入标签名')
    if(name){
      if(name){
        window.createTag(name)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags{
  background-color: white;
  font-size: 16px;
  > .tag{
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