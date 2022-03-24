<template>
  <div>
    <Layout class-prefix="layout" >
      <NumberPad @update:value="onUpdateAmount"/>
      <Types @update:value="onUpdateType"/>
      <Notes @update:value="onUpdateNotes"/>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
import NumberPad from '@/components/Ledger/NumberPad.vue';
import Types from '@/components/Ledger/Types.vue';
import Notes from '@/components/Ledger/Notes.vue';
import Tags from '@/components/Ledger/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component({components: {Tags, Notes, Types, NumberPad}})
export default class Ledger extends Vue{
  tags = ['衣', '食', '住', '行', '股票'];
  onUpdateTags(value: string){}
  onUpdateNotes(value:string){}
  onUpdateType(value:string){}
  onUpdateAmount(value:string){}
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>