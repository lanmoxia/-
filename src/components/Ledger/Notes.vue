<template>
  <div>
    {{value}}
    <label class="notes">
      <span class="name">备注</span>
      <input type="text"
             v-model="value"
             placeholder="请在这里输入內容">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class Notes extends Vue{
  value= '';
}
</script>

<style lang="scss" scoped>
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
</style>