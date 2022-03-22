<template>
<div>
  <Layout class-prefix="layout" >
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">OK</button>
        <button class="zero">0</button>
        <button>.</button>

      </div>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="请在这里输入內容">
      </label>
    </div>
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
  </Layout>
</div>
</template>

<script lang="ts">
export default {
  name: 'Ledger'
};
</script>
<style lang="scss">
.layout-wrapper{
  //border: 10px solid red;
}
.layout-content{
  //border: 8px solid blue;
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.numberPad{
  .output{
    @extend %clearfix;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    /*box-shadow: inset 0 -5px 5px -5px fade_out(black, 0.6),
     *inset 0 5px 5px -5px fade_out(black, 0.6);*/
    @extend %innerShadow
  }
  .buttons{
    @extend %clearfix;
    > button{
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok{
        height: 64*2px;
        float: right;
      }
      &.zero{
        width: 25*2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1){
        background: $bg;
      }
      &:nth-child(2),&:nth-child(5){
        background: darken($bg, 4%);
      }
      &:nth-child(3),&:nth-child(6),&:nth-child(9){
        background: darken($bg, 4*2%);
      }
      &:nth-child(4),&:nth-child(7),&:nth-child(10){
        background: darken($bg, 4*3%);
      }
      &:nth-child(8),&:nth-child(11),&:nth-child(13){
        background: darken($bg, 4*4%);
      }
      &:nth-child(14){
        background: darken($bg, 4*5%);
      }
      &:nth-child(12){
        background: darken($bg, 4*6%);
      }
    }
  }
}
.types{
  background: #c6c6ca;
  display: flex;
  text-align: center;
  color: #1e1b1c;
  font-size: 24px;
  > li {
    width: 50%;
    /*
      *這裡如果使用 line-height 垂直居中會因為 border 有問
      *使用 flex 居中比較好
    */
    justify-content: center;
    align-items: center;
    position: relative;
    /*這裡的 & 表示同級當前的 li 不是子代*/
    &.selected::after{
      /*这里使用伪元素+绝对定位添加选中态 使用 border 会影响高度*/
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #848283;
    }
  }
}
.notes{
  background: #f2f3f5;
  font-size: 14px;
  padding-left:16px;
  display: flex;
  align-items: center;
  .name{
    padding-right: 16px;
    color: #1e1b1c;
  }
  input{
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
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
      $h: 24px;
      height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      color: #1e1b1c;
      /*
        *確定裡邊只有一行字用 line-height
        *不能確定是一行字 每個 li flex 上下居中
       */
      line-height: $h;
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