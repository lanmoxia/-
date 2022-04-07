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
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
@Component({
  components: {Button},
  computed:{
    tags(){
      return this.$store.state.tagList
    }
  }
})
// 第二步 使用继承 mixins
export default class Labels extends mixins(TagHelper){
  // 这里跟 Tags 重复 fetchTags
  // 原则上切标签就要重复 fetch 比较好
  created(){ // beforeCreated 会导致刷新获取不到标签 必须在 ledger 页面切过来才可以 使用 created 可以解决
    this.$store.commit('fetchTags')
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