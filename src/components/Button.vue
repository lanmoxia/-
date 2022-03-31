<template>
<div>
<!--   小 button 被点击 触发大 Button 事件-->
  <button class="button"
          @click="$emit('click', $event)">
    <slot/>
  </button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>
.button{
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