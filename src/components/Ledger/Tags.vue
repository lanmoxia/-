<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tags'
};
</script>

<style lang="scss" scoped>
.tags{
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current{
    display: flex;
    flex-wrap: wrap;
    > li{
      background: #cac9ce;
      //$h: 24px;
      height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      color: #1e1b1c;
      /*
        *確定裡邊只有一行字用 line-height
        *不能確定是一行字 每個 li flex 上下居中
       */
      line-height: 24px;
    }
  }
  > .new{
    padding-top:16px;
    button{
      background: transparent;
      border: none;
      color: #1e1b1c;
      border-bottom: 1px solid;
      /*下邊線幣上邊的文字長 加 padding*/
      padding: 0 3px;
    }
  }
}
</style>