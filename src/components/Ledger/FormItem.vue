<template>
  <div>
    {{value}}
    <label class="notes">
      <span class="name">{{filterName}}</span>
      <input type="text"
             v-model="value"
             @input="onValueChanged"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class FormItem extends Vue{
  value = '';
  @Prop({required: true}) filterName!: string // {required: true}:必须传一个 name
  @Prop() placeholder?: string
  onValueChanged(){
    this.$emit('update:value', this.value)
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>