<template>
<div>
  <Layout>
    <ol class="tags">
    <li>
      <span>衣</span>
      <Icons name="right"/>
    </li>
    <li>
      <span>食</span>
      <Icons name="right"/>
    </li>
    <li>
      <span>住</span>
      <Icons name="right"/>
    </li>
    <li>
      <span>行</span>
      <Icons name="right"/>
    </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Layout>
</div>
</template>

<script lang="ts">
export default {
  name: 'Labels'
};
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