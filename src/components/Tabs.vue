<template>
  <ul class="tabs" :class="{[classPrefix+ '-tabs']: classPrefix}">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
        :class="liClass(item)" @click="select(item)">{{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
type DataSourceItem = {text: string, value: string}
@Component
export default class Types extends Vue {
  @Prop({required: true, type: Array}) dataSource!:DataSourceItem
  @Prop(String) readonly value!: string // 叹号表示不会是空
  @Prop(String) classPrefix?: string // 问好表示有可能是空 Prop 内的类型最好写好

  liClass(item: DataSourceItem){
    return{
      [this.classPrefix + '-tabs-item']:this.classPrefix, // 这里要用 this
      selected: item.value === this.value
    }
  }
  select(item: DataSourceItem){
    this.$emit('update:value', item.value)
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
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