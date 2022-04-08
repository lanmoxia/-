<template>
  <div>
    <ul class="types">
      <!-- 这里需要两个类，用对象的形式，如果其中一个需要链接的字符串，需要用中括号括起来 这也是表驱动编程-->
      <!-- 第一个类是当你传了 classPrefix 的时候  [classPrefix + 'item'] 会出现在 li 上-->
      <!-- 第二个类是当 value==='-' 为 true 的时候 selected 类会出现在 li 上-->
      <li :class="{[classPrefix + '-item']: classPrefix,selected: value === '-'}"
          @click="selectType( '-')">支出
      </li>
      <li :class="{[classPrefix + '-item']: classPrefix,selected: value === '+'}"
          @click="selectType( '+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class Types extends Vue{
  // 方便解决后期更改需求麻烦 比如默认支出改为收入 这里使用 prop 比较合适
  @Prop(String) readonly value!: string // 叹号表示不会是空
  @Prop(String) classPrefix?: string // 问好表示有可能是空 Prop 内的类型最好写好
  selectType(type:string){
    if(type !== '-' && type !== '+'){
      throw new Error('type is unknown')
    }
    this.$emit('update:value', type)
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>