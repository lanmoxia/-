<template>
<Layout>
  <div>
    <Icons name="left"/>
    <span>编辑标签</span>
  </div>
  <FormItem filter-name="标签名" placeholder="请输入标签名" />
  <Button>删除标签</Button>
</Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';
import FormItem from '@/components/Ledger/FormItem.vue';
import Button from '@/components/Button.vue';
@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  created(){
    const id = this.$route.params.id
    //console.log(this.$route.params);
    tagListModel.fetch()
    const tags = tagListModel.data
    const tag = tags.filter(t => t.id === id)[0]
    if(tag){
      console.log(tag);
    }else{
      // replace 替代 push 更好 用户在404页面回退 push 会退不回去
      //this.$router.push('/404')
      this.$router.replace('/404')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>