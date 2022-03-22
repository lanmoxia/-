<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'"
          @click="selectType( '-')">支出
      </li>
      <li :class="type === '+' && 'selected'"
          @click="selectType( '+')">收入
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Types',
  props:['x'],
  data(){
    return {
      type: '-'
    }
  },
  methods:{
    selectType(type){
      if(type !== '-' && type !== '+'){
        throw new Error('type is unknown')
      }
      this.type = type
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>