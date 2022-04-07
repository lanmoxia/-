<template>
  <Layout>
    <div class="navBar">
      <!--      这里点击没有触发 icon 的 goBack 需要在 Icons.vue 中触发 icon-->
      <Icons class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"/>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update"
                filter-name="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Ledger/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({components: {Button, FormItem}})
export default class EditLabel extends Vue {
  get tag(){
    return this.$store.state.currentTag
  }

  created(){
    const id = this.$route.params.id
    // 刷新自己 fetch
    this.$store.commit('fetchTags')
    // 通过 setCurrentTag 发现 index.ts 中是在 tagList 找 ID
    // 这里刷新相当于没有从切他页面切过来，其他组件没有刷新获取 tagList，所以这里刷新需要先重新获取
    this.$store.commit('setCurrentTag', id)
    if(!this.tag){
      this.$router.replace('/404')
    }
  }
  update(name: string){
    if(this.tag) {
      this.$store.commit('updateTag',{id:this.tag.id, name: name})
    }
  }
  remove() {
    if (this.tag)
    this.$store.commit('removeTag',this.tag.id)
  }
  goBack(){
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper{
  background: white;
  margin-top: 8px;
}
.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>