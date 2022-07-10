<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click=inputContent class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator';
@Component
export default class Types extends Vue{
  @Prop(Number) readonly value!: number // 这里不写 Number 类型 会导致统计页面变成字符串相加
  output = this.value.toString() // output 初始值是外边传入的

  inputContent(event: MouseEvent){// event 类型是鼠标事件
    // 强制类型：! 或者 as HTMLButtonElement
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    //位数限制
    if(this.output.length === 16){return;}
    // 输出为 0
    if(this.output === '0'){
      if('0123456789'.indexOf(input) >=0){
        this.output = input;
      }else{this.output += input;}
      return
    }
    // 输出为 .
    if(this.output.indexOf('.') >= 0){
      if( input === '.'){return}
      const decimal = /^\d+(?:\.\d?)?/
      if(this.output.replace(decimal,'')){return}
      this.output = this.output.match(decimal)!.toString()
    }
    // 其他情况
    this.output += input;
  }
  remove(){
    if(this.output.length === 1){
      this.output = '0'
    }else{
      this.output = this.output.slice(0,-1)
    }
  }
  clear(){
    this.output = '0'
  }
  ok() {
    // 点击 OK 才会触发事件更合适
    const output = parseFloat(this.output)
    this.$emit('update:value', output)
    // 多触发一个 submit 事件
    this.$emit('submit', this.onValueChange())
  }
  @Watch('value')
  onValueChange(){ return this.output = this.value.toString()}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.numberPad {
  .output {
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }
  .buttons {
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 64*2px;
        float: right;
      }
      &.zero {
        width: 25*2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }
      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }
      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }
    }
  }
}
</style>